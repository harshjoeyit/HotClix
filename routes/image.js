const   router = require('express').Router(),
        keys = require('../config/keys'),
        verify = require('./verifyToken'),
        AWS = require('aws-sdk'),
        uuid = require('uuid/v4'),
        { imageUploadValidation } = require('../validations/imageValidations'),
        url = require('url');


// IMAGE MANIPULATION PACKAGES 

const   sharp = require('sharp'),
        imagemin = require('imagemin'),
        mozjpeg = require('imagemin-mozjpeg'),
        isJpg = require('is-jpg');



// AWS CONFIG 1

const s3 = new AWS.S3({
    accessKeyId: keys.AWS_ID,
    secretAccessKey: keys.AWS_SECRET
})


// CONVERT TO JPG

const convertToJpg = async (input) => {
    if (isJpg(input)) {
        return input;
    }

    return sharp(input)
        .jpeg()
        .toBuffer();
}


// UPLOAD A FILE AND ITS THUMBNAIL AND RETURN FILENAME & LOCATION

const uploadSingleFile = async (file) => {

    // COMPRESS FILE

    const fileBuffer = await imagemin.buffer(file.data, {
        plugins: [convertToJpg, mozjpeg({ quality: 85 })]
    })

    // COMPRESS THUMBNAIL

    const thumbnailBuffer = await imagemin.buffer(file.data, {
        plugins: [convertToJpg, mozjpeg({ quality: 40 })]
    })

    const uniqueId = uuid()
    const parts = file.name.split('.')
    parts.pop()
    const fileName = parts.join('')

    // PARAMS

    const fileParams = {
        Bucket: keys.AWS_BUCKET_NAME,
        Key: `${fileName}_${uniqueId}.jpg`,
        Body: fileBuffer
    }
    const thumbnailParams = {
        Bucket: keys.AWS_BUCKET_NAME,
        Key: `${fileName}_${uniqueId}_thumbnail.jpg`,
        Body: thumbnailBuffer
    }

    // UPLOAD TO AWS

    try {
        const fileRes = await s3.upload(fileParams).promise()
        const thumbRes = await s3.upload(thumbnailParams).promise()

        return {
            fileName,
            fileUrl: fileRes.Location,
            thumbnailUrl: thumbRes.Location
        }
    }
    catch (err) {
        console.log(err)
    }
}


// CREATE ENTRY IN DB FOR SINGLE UPLOAD

const saveUpload = async (uploadData) => {

    const { userId, galleryId, fileName, fileUrl, thumbnailUrl } = uploadData

    // INSERT INTO images TABLE

    let sql = `INSERT INTO images (uploaded_by, gallery, name, extension, file_url, thumbnail_url)
    VALUES('${userId}', '${galleryId}', '${fileName}', 'jpg', '${fileUrl}', '${thumbnailUrl}')`

    let dbRes = await dbquery(sql)
    let res = { id: dbRes.insertId }
    
    // INCREASE PHOTO COUNT in GALLERY TABLE 

    sql = `UPDATE gallery SET total_photos = total_photos + 1 WHERE id = '${galleryId}'`
    dbRes = await dbquery(sql)

    return res
}


// UPLOAD IMAGES 

router.post('/', verify, async (req, res) => {
    let imageFiles = req.files.images
    const { galleryId } = req.body

    // VALIDATE 

    if(imageFiles === undefined) {
        return res.status(400).send({"error": "Upload at least 1 file"})
        // TODO
        // vaildate files mimetype
    }

    const {error} = imageUploadValidation(req.body)
    if(error) {
        return res.status(400).send({"error":  error.details[0].message})
    }

    // CHECK IF GALLERY EXISTS

    let sql  = `SELECT * FROM gallery WHERE id = '${galleryId}'`
    const galleryFound = await dbquery(sql)

    if(galleryFound.length === 0) {
        return res.status(400).send({'error': 'invalid gallery'})
    }

    if (!Array.isArray(imageFiles)) {
        imageFiles = [imageFiles]
    }

    // UPLOAD ONE BY ONE
    const uploadedFileIds = []

    for (let i = 0; i < imageFiles.length; i++) {
        uploadData = await uploadSingleFile(imageFiles[i])
        uploadData = {
            ...uploadData,
            userId: req.userId,
            galleryId
        }
        const { id } = await saveUpload(uploadData)
        
        // ADD TO THE UPLOADED FILES
        uploadedFileIds.push(id)
    }

    return res.status(201).send({
        'message': 'all files uploaded',
        'files': uploadedFileIds
    })
})


// GET AN IMAGE 

router.get('/:imageId', async (req, res) => {
    const { imageId } = req.params

    let sql = `SELECT * FROM images WHERE id = '${imageId}'`
    let imageFound = await dbquery(sql)

    if(imageFound.length === 0) {
        return res.status(400).send({'error': 'Image does not exist'})
    }

    imageFound = imageFound[0]

    // GET USER 
    sql = `SELECT * FROM users WHERE id = '${imageFound.uploaded_by}'`;
    let user = await dbquery(sql)

    imageFound.username = user[0].username

    return res.status(200).send({
        'message': 'image found',
        image: imageFound
    })
}) 


// LIST ALL IMAGES
// IN GALLERY, BY USER & ALL 

router.get('/', async (req, res) => {
    const queryObject = url.parse(req.url,true).query;
    const { galleryId, userId } = queryObject
    
    let sql = `SELECT * FROM images`

    if(userId) {
        sql = `${sql} WHERE uploaded_by = '${userId}'`
    } 
    else if(galleryId) {
        sql = `${sql} WHERE gallery = '${galleryId}'`
    }

    sql = `${sql} ORDER BY created_at DESC`

    const images = await dbquery(sql)

    return res.status(200).send({
        "message": "images found",
        images
    })
})


// DELETE IMAGE 

router.delete('/:imageId', verify, async(req, res) => {
    const { imageId } = req.params
    const userId = req.userId

    let sql = `SELECT * FROM images WHERE id = '${imageId}'`
    const imageFound = await dbquery(sql)

    // CHECK IF THE IMAGE EXISTS & USER OWNS THIS IMAGE 

    if(imageFound.length === 0) {
        return res.status(400).send({'error': 'No image found'})
    }
    else if(imageFound[0].uploaded_by !== userId) {
        return res.status(400).send({'error': 'Only the owner can delete the image'})
    }

    // DELETE FROM DB

    sql = `DELETE FROM images WHERE id = ${imageId}`
    let dbRes = await dbquery(sql)

    // DECREASE PHOTO COUNT in GALLERY TABLE 

    sql = `UPDATE gallery SET total_photos = total_photos - 1 WHERE id = '${imageFound[0].gallery}'`
    dbRes = await dbquery(sql)

    res.status(204).send()
})


// UPDATE IMAGE 



module.exports = router

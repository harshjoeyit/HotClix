const   router = require('express').Router(),
        keys = require('../config/keys'),
        verify = require('../routes/verifyToken'),
        AWS = require('aws-sdk'),
        uuid = require('uuid/v4'),
        { imageUploadValidation } = require('../validations/imageValidations');


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

    const sql = `INSERT INTO images (uploaded_by, gallery, name, extension, file_url, thumbnail_url)
    VALUES('${userId}', '${galleryId}', '${fileName}', 'jpg', '${fileUrl}', '${thumbnailUrl}')`

    const image = await dbquery(sql)
    console.log(image)
    return { id: image.insertId }
}


// UPLOAD IMAGES 

router.post('/', verify, async (req, res) => {
    let imageFiles = req.files.images
    const { galleryId } = req.body

    // VALIDATE 

    if(imageFiles === undefined) {
        return res.status(400).send({"message": "Upload at least 1 file"})
        // TODO
        // vaildate files mimetype
    }

    const {error} = imageUploadValidation(req.body)
    if(error) {
        return res.status(400).send({"message":  error.details[0].message})
    }

    // CHECK IF GALLERY EXISTS

    let sql  = `SELECT * FROM gallery WHERE id = '${galleryId}'`
    const galleryFound = await dbquery(sql)

    if(galleryFound.length === 0) {
        return res.status(400).send({'message': 'invalid gallery'})
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

    return res.send({
        'message': 'all files uploaded',
        'files': uploadedFileIds
    })
})


module.exports = router

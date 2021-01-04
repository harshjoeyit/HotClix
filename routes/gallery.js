const   router = require('express').Router(),
        verify = require('./verifyToken'),
        url = require('url'),
        { createGalleryValidation } = require('../validations/galleryValidations');


// CREATE A GALLERY 

router.post('/', verify, async(req, res) => {

    // VALIDATE NAME

    const {error} = createGalleryValidation(req.body)
    if(error) {
        return res.status(400).send({ 'error': error.details[0].message })
    }

    const { name } =  req.body, userId = req.userId
    
    // CHECK IF GALLERY WITH SAME NAME EXIST CREATED BY THIS USER
    
    let sql =  `SELECT * FROM gallery WHERE name = '${name}' 
                AND created_by = '${userId}'`
    let galleries = await dbquery(sql)
    if(galleries.length !== 0) {
        return res.status(400).send({'error': 'You already have a gallery by this name' })
    }

    // SAVE NEW GALLERY
    
    sql = `INSERT INTO gallery (name, created_by)
                VALUES('${name}', '${userId}')`
    dbRes = await dbquery(sql)

    return res.status(201).send({
        'message': 'new gallery created', 
        id: dbRes.insertId 
    })
})


// LIST ALL GALLERIES FOR A USER 

router.get('/', verify, async (req, res) => {
    const userId = req.userId
    
    let sql = `SELECT * FROM gallery WHERE created_by = '${userId}'`
    const galleries = await dbquery(sql)

    let response = { galleries };
    if(galleries.length === 0) {
        response.error = 'No galleries found'
    } else {
        response.message = 'Galleries found'
    }

    return res.status(200).send(response)
})


// DELETE GALLERY 

router.delete('/:galleryId', verify, async(req, res) => {
    const { galleryId } = req.params
    const userId = req.userId

    let sql = `SELECT * FROM gallery WHERE id = '${galleryId}'`
    const galleyFound = await dbquery(sql)

    // CHECK IF THE GALLERY EXISTS & USER OWNS THIS GALLERY 

    if(galleyFound.length === 0) {
        return res.status(400).send({'error': 'No gallery found'})
    }
    else if(galleyFound[0].created_by !== userId) {
        return res.status(400).send({'error': 'Only the owner can delete the gallery'})
    }

    // DELETE FROM DB

    sql = `DELETE FROM gallery WHERE id = ${galleryId}`
    const dbRes = await dbquery(sql)

    res.status(204).send()
})


// UPDATE A GALLERY (name only)



module.exports = router
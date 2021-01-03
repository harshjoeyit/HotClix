
const Joi = require('@hapi/joi')

// CREATE GALLERY VALIDATION

const createGalleryValidation = data => {

    const schema = Joi.object({
        name: Joi.string()
                .required()
                .max(255)
    })

    return schema.validate(data)
}

module.exports.createGalleryValidation = createGalleryValidation
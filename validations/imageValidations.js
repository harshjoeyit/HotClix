
const Joi = require('@hapi/joi')

// IMAGE UPLOAD VALIDATION

const imageUploadValidation = data => {
    
    const schema = Joi.object({
        galleryId: Joi.number()
                    .required()
                    .positive()
    })

    return schema.validate(data)
}

module.exports.imageUploadValidation = imageUploadValidation
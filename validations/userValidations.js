
const Joi = require('@hapi/joi')

// REGISTER VALIDATION

const registerValidation = data =>{
    const schema = Joi.object({
        username : Joi.string()
                    .required(),
        
        email: Joi.string()
                .required()
                .email(),
        
        password: Joi.string()
                    .min(6)
                    .required()
        // image 
    })

    return schema.validate(data)
}


// LOGIN VALIDATION

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
                .required()
                .email(),
        
        password: Joi.string()
                    .required()
    })

    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
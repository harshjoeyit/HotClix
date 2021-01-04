const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const verify = require('./verifyToken')
const { registerValidation, loginValidation } = require('../validations/userValidations');


// REGISTER USER 

router.post('/register', async (req,res) => {
    
    // VALIDATE USER DATA 

    const {error} = registerValidation(req.body)
    if(error) {
        return res.status(400).send({"error":  error.details[0].message})
    }

    // CREATE NEW USER FUNCTION

    const createNewUser = async ({ email, username, password }) => {
        console.log('creating new user')
        
        let salt, hashedPassword;
        try {
            salt = await bcrypt.genSalt(10)
            hashedPassword = await bcrypt.hash(password, salt)
        }
        catch(err) {
            console.log('could not hash password')
        }
        
        let sql = `INSERT INTO users (username, email, password) 
                    VALUES('${username}', '${email}', '${hashedPassword}')`
        
        const dbRes = await dbquery(sql)
        return res.status(201).send({'message': 'user created', id: dbRes.insertId}) 
    }

    // CHECK IF USER WITH THIS EMAIL EXISTS 

    let sql = `SELECT * FROM users WHERE email = '${req.body.email}'`
    const userFound = await dbquery(sql)

    if(userFound.length !== 0) {
        return res.status(400).send({'error': 'user already exists'})
    }

    // CREATE NEW USER 

    return createNewUser(req.body)
})


// LOGIN USER 

router.post('/login', async (req, res) => {

    // VALIDATE USER DATA 

    const {error} = loginValidation(req.body)
    if(error) {
        return res.status(400).send({"error":  error.details[0].message})
    }

    const { email, password } = req.body

    // CHECK IF USER EXIST 

    let sql = `SELECT * FROM users WHERE email = '${email}'`
    let user = await dbquery(sql)

    if(user.length === 0) {
        return res.status(400).send({'error': 'invalid user!'})
    }
    user = user[0]

    // VERIFY PASSWORD

    const validPass = await bcrypt.compare(password, user.password) 
    if(!validPass) {
        return res.status(400).send({'error': 'invalid password'})
    }

    // CREATE AND ASSIGN NEW TOKEN
   
    const token = jwt.sign({ id: user.id }, keys.TOKEN_SECRET, {expiresIn: 86400 });
    res.header('auth-token', token).send({ 'message': 'token generated', token: token })
})


// GET USER WITH USER ID 

router.get('/:userId', async (req, res) => {
    const { userId } = req.params

    let sql = `SELECT * FROM users WHERE id = '${userId}'`
    const userFound = await dbquery(sql)

    if(userFound.length === 0) {
        return res.status(400).send({'error': 'User does not exist'})
    }
    
    delete userFound[0].password

    return res.status(200).send({
        'message': 'user found',
        user: userFound[0]
    })
})


// UPDATE USER



module.exports = router
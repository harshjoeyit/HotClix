const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// MIDDLEWARE FUNCTION FOR 
// PROTECTED ROUTES 

const verify = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send({'message': 'Access Denied, Not auth-token provided'})
    }
    
    try { 
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).send({'message': 'Unauthorized'})
            }
            req.userId = decoded.id

            // GO TO THE MAIN TASK
            next()
        })
    }
    catch (err) {
        return res.status(400).send('Invalid Token');
    }
}

module.exports = verify
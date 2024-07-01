const jwt = require('jsonwebtoken')
require("dotenv").config();

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.SECRET_KEY

    if(!token){
        return res.status(401).json({
            status: "0",
            message: "No Token, Unauthorised",
          });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(401).json({
                status: "0",
                message: "Forbidden, token is not valid",
                error:err
            });
        }
        next();
      });

}

const generateToken = async (data) => {
    const {uid, number} = data
    const secret = process.env.SECRET_KEY
    const payload = {
        uid:uid,
        number:number
    }
    try {
        return jwt.sign(payload, secret)
    } catch (error) {
        console.log("Error during genreateToken", error)
    }
}

module.exports = {
    verifyJwt,
    generateToken
}
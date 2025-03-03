const jwt = require("jsonwebtoken");
const SECRET_KEY = "This is very Secret";


function generateToken(expiresIn = "1d") {
    return jwt.sign({}, SECRET_KEY, { expiresIn });
}


function validateToken(token) {
    try {
        jwt.verify(token, SECRET_KEY);
        return true; // Token is valid
    } catch (error) {
        return false; // Invalid or expired token
    }
}






module.exports = { generateToken, validateToken };
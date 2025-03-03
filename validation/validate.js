const jwt = require("./jwt");


function isEmpty(obj) {
    if(obj === undefined || obj === null) {
        return true;
    }
    const strObj = obj.toString()
    return strObj.trim().length === 0;
}


function  validateAndSetCookies(req, res, next) {
    const clientToken = req.cookies["token"];
    if(clientToken) {
        next();
    }else{
        const  jwtToken = jwt.generateToken();
        // Set jwt token to cookie for one day
        res.cookie('token', jwtToken, { maxAge: (60 * 60 * 1000)*24 });
        res.cookie(jwtToken,1,{maxAge:(60 * 60 * 1000)*24});
        next();
    }
}



function validateElimination(req, res, next) {

    const clientToken = req.cookies["token"];

    if(!jwt.validateToken(clientToken)) {
        return res.status(403).send({"error": "Invalid token"});
    }
    const clientStatus = req.cookies[clientToken];

    console.log(clientStatus);
    if(parseInt(clientStatus) === 1) {
        next();
    }else{
        res.render('eliminate');
    }
}


module.exports = {isEmpty, validateElimination, validateAndSetCookies}
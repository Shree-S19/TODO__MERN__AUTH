const errorHandler = require('./CreateError.js');
const jwt = require('jsonwebtoken');

const checkAuth = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler({status : 401, message : 'Unathorized'}));
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
        if(err){
            return next(errorHandler({status : 401, message : 'Invalid Token'}));
        }else{
            req.user = decoded;
            return next();
        } 
    })
}

module.exports = checkAuth;
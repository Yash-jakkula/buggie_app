const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const student = require('../Models/Student');
const Driver = require('../Models/Driver')


exports.protect = async(req,res,next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
   
        else if(req.cookies.token){
        token = req.cookies.token;
    }
        if(!token){
            return next(
                new ErrorResponse(`not authorized to use this operation`,401)
            )
        }

        try{
            const verify = jwt.verify(token,process.env.JWT_SECRET);
            req.student = await student.findById(verify.id);
            next();            
        }
        catch(err){
            return next(
                new ErrorResponse(`user not authorized`,401)
            )
        }

    }
    catch(err){
        next(err);
    }
}


exports.extractUserDetailsFromToken = async(req, res, next) => {
    // Get token from header
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1];
    else if(req.cookies.token){
    token = req.cookies.token;
}
 
    if (!token) {
        return next(new ErrorResponse('Access denied. No token provided.', 401));
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user details to the request object for further use
        if(decoded.role === 'student'){
        req.user = await student.find({_id:decoded.id});
        }
        else{
        req.user = await Driver.find({_id:decoded.id});
        }
        next();
    } catch (err) {
        return next(new ErrorResponse('Invalid token', 401));
    }
};




exports.protectD = async(req,res,next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
   
        else if(req.cookies.token){
        token = req.cookies.token;
    }
        if(!token){
            return next(
                new ErrorResponse(`not authorized to use this operation`,401)
            )
        }

        try{
            const verify = jwt.verify(token,process.env.JWT_SECRET);
            req.driver = await Driver.findById(verify.id);
            next();            
        }
        catch(err){
            return next(
                new ErrorResponse(`user not authorized`,401)
            )
        }

    }
    catch(err){
        next(err);
    }
}

exports.authorize = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.student.role))
        return next(
        new ErrorResponse(`cannot access the request with the ${req.student.role} role`,403) 
        )
      
        next();
    }
}

exports.authorizeD = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.driver.role))
        return next(
        new ErrorResponse(`cannot access the request with the ${req.driver.role} role`,403) 
        )
      
        next();
    }
}
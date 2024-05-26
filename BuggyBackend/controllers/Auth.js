const Driver = require('../Models/Driver');
// const crypto = require('crypto');
const Student = require('../Models/Student');
const ErrorResponse = require('../utils/errorResponse');

exports.userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new ErrorResponse('Enter valid email and password', 400));
        }

        // Check if the email exists in the Student collection
        const student = await Student.findOne({ email: email }).select('+password');
        if (student) {
            const isMatch = await student.matchPassword(password);
            if (isMatch) {
                sendTokenRes(200, student, res);
            }
        }

        // Check if the email exists in the Driver collection
        const driver = await Driver.findOne({ email: email }).select('+password');
        if (driver) {
            const isMatch = await driver.matchPassword(password);
            if (isMatch) {
                sendTokenRes(200, driver, res);
            }
        }

        // If no matching user found
        return next(new ErrorResponse('Invalid credentials entered', 400));
    } catch (err) {
        next(err);
    }
};


exports.userLogout = (req,res,next) => {
    try{
       return res.cookie('token','none',{
            expires:new Date(Date.now() + 10 * 1000),
            httpOnly:true
        }).status(200).json({
            success:true,
            data:{}
        })
    }
    catch(err){
        next(err);
    }
}

exports.getUser = async (req,res,next) => {
    try{
        const data = req.user;
        
    if(data){
       return res.status(200).json({
            success:true,
            data
        })
    }
    else{
        return new ErrorResponse(`failed to fetch the user data`,400);
    }
    }
    catch(err){
        next(err);
    }
}

const sendTokenRes = (statusCode,user,res) => {
    const token = user.getSignedJwtToken();

    options = {
        expires:new Date(Date.now() + 30 * 24 * 60 *60 * 1000),
        httpOnly:true
    }

    return res
    .cookie('token',token,options)
    .status(statusCode).json({
        success:true,
        token
    })
}


exports.getallStudents = async(req,res,next) => {
    try{
        const students = await Student.find();
        res.status(200).json({
            success:true,
            students
        })
    }
    catch(err){
        next(err);
    }
}

exports.getallDrivers = async(req,res,next) => {
    try{
        const drivers = await Driver.find();
        res.status(200).json({
            success:true,
            drivers
        })
    }
    catch{
        next(err);
    }
}






// exports.studentLogin = async (req,res,next)=>{
//         try{
//             const {studentEmail,studentPassword} = req.body;
        
//             if(!studentEmail || !studentPassword){
//                return next(new ErrorResponse(`enter valid rEmail andPassword`,400));
//             }
    
//             const user = await Student.findOne({studentEmail}).select('+studentPassword');
//             console.log(user);
//             if(user==='null'){
//                return next(new ErrorResponse(`invalid crendentials entered`,400))
//             }
//            const isMatch = await user.matchPassword(studentPassword); 
//            if(!isMatch){
//            return next(new ErrorResponse(`invalid crendentials entered`,400))
//            }
//            sendTokenRes(200,user,res);
//         }
//         catch(err){
//             next(err);
//         }
//     }

// exports.studentLogout = (req,res,next) =>{
   
//         try{
//             return res.cookie('token','none',{
//                 expires:new Date(Date.now() + 10 * 1000),
//                 httpOnly:true
//             }).status(200).json({
//                 success:true,
//                 data:{}
//             })
//         }
//         catch(err){
//             next(err);
//         }
//     }
       
// exports.driverLogin = async (req,res,next) => {
//     try{
//         const {driverEmail,driverPassword} = req.body;
    
//         if(!driverEmail || !driverPassword){
//            return next(new ErrorResponse(`enter valid DriverEmail and DriverPassword`,400));
//         }

//         const user = await Driver.findOne({driverEmail}).select('+driverPassword');
//         if(!user){
//            return next(new ErrorResponse(`invalid crendentials entered`,400))
//         }
//        const isMatch = await user.matchPassword(driverPassword); 
//        if(!isMatch){
//        return next(new ErrorResponse(`invalid crendentials entered`,400))
//        }
//        sendTokenRes(200,user,res);
//     }
//     catch(err){
//         next(err);
//     }
// }

// exports.driverLogout = (req,res,next) => {
//     try{
//         return res.cookie('token','none',{
//             expires:new Date(Date.now() + 10 * 1000),
//             httpOnly:true
//         }).status(200).json({
//             success:true,
//             data:{}
//         })
//     }
//     catch(err){
//         next(err);
//     }
// }

   
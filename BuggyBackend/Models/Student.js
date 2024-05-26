const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const geoCoder = require('../utils/geoCoder')

const Student = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name']
    },
    role:{
        type:String,
        enum:['student'],
        default:'student'
    },
    
    location: {
        
        type: {
          type: String,
          enum: ["Point"],
        },
        coordinates: {
          type: [Number],
          index: "2dsphere",
          default:[12.968599154614157,79.16013297793172]
        },
       
      },
    email: {
        type: String,
        required:[true,'please add a email'],
        unique:[true,'email already exists'],
        match: [
            /^[\w.-]+@vitstudent\.ac\.in$/,
          "Please add a valid email",
        ],
      },
    
    password:{
        type:String,
        select:false,
        minlength:6,
        required:[true,'please add a password']
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now,

    }
    
})


Student.pre('save',async function(next){
    try{
        // if(!this.isModified('password')){
        //     next();
        // }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    }
    catch(err){
        next(err)
    }
    next();
})

Student.methods.getSignedJwtToken = function() {
   return jwt.sign({id:this._id,role:this.role},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE_IN
    })
    
}

Student.methods.matchPassword =async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

Student.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
}


module.exports = mongoose.model('Student',Student);
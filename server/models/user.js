const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const passswordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
    firstName:{type:string,required:true},
    lastName:{type:string,required:true},
    email:{type:string,required:true},
    password:{type:string,required:true}
})

userSchema.methods.generateAuthToken = ()=>{
    const token = jwt.sign({_id:this.id},"jwtkey", { expiresIn: 600 })
    return token
}
const User = mongoose.model('User', userSchema)

const validate = (data)=>{
    const schema = joi.object({
        firstName:joi.string().required().label('first Name'),
        lastName:joi.string().required().label('last Name'),
        email:joi.string().required().label('email'),
        password:passswordComplexity.required().label('password')
    })
    return schema.validate(data)
}
module.exports = {User, validate, }
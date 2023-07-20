const express = require('express')
const Joi = require('joi')
const User = require('./users')
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/', async(req,res)=>{
    // const {email, password} = req.body
    // const user = User.findOne(email)

    // if(user){
    //     const hashedPassword = User.password
    //     const comparedPassword = await bcrypt.compare(password, hashedPassword)
    //     if(comparedPassword){
    //         res.status(201).json({
                
    //         })
    //     }
    // }
    try {
        const{error}= validate(req.body)
        if(error)
        //check user error
            return res.status(400).send({message: error.details[0].message})
        const user = await User.findOne({email:req.body.email})
        if(!user)
        return res.status(401).send({message:'Invalid email or password'})

        const validatePassword = bcrypt.compare(req.body.password, User.password)
        if(!validatePassword)
        return res.status(401).send({message: 'Invalid email or  password'})

        const token = user.generateAuthToken()
        res.status(200).send({data:token, message:"Logged in successfully"})
        
    } catch (error) {
        res.status(500).send({message:"Internal error"})
    }
})
const validate = (data)=>{
    const schema = Joi.object({
        email:Joi.string().email().required().label('Email'),
        password:Joi.string().password().required().label('password')
    })
    return schema.validate(data)
}

module.exports = router

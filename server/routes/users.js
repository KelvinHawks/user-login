const express = require('express')
const router = express.Router()
const {User, validate} = require('./user')
const bcrypt = require('bcrypt')

router.post('/', async(req,res)=>{
    try {
        const{error} = validate(req.body)
        if(error)
        return res.status(400).send({message:error.details[0].message})
        const user = await User.findOne({email:req.body.email})
        if(user)
            return res.status(409).send({message:"user exists"})

            const salt = await bcrypt.genSalt(NUMBER(process.env.SALT))
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            await new User({...req.body, password:hashedPassword}).save()
            res.status(201).send({message:'User created successfully'})
    } catch (error) {
        res.status(500).send({message:'Internal server error'})
    }
})
module.exports = router
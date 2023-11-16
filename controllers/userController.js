const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler') 

const userRegister = asyncHandler( async (req,res) => {
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please enter all fields')
    }
    const existEmail = await User.findOne({email})
    if(existEmail){
        res.status(400)
        throw new Error('User already exist')
    }else{
        const salt = await bcrypt.genSalt(10)
        const hashedPasswod = await bcrypt.hash(password,salt)

        const user = await User.create({
            name,
            email,
            password : hashedPasswod,
        })
        res.status(200).json({
            _id : user.id,
            name:user.name,
            email : user.email,
            token : generateJWT(user.id)
        })
    }
})
const userLogin = asyncHandler( async (req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({email})

    if(user){
        const checkPassword = await bcrypt.compare(password,user.password)
        if(checkPassword){
            res.status(200).json({
                name : user.name,
                email : user.email,
                token : generateJWT(user.id)
            }) 
        }else{
            res.status(400)
            throw new Error('Invalid password')
        }
    }else{
        res.status(400)
        throw new Error('Invalid credential')
    }
})
const getMe = asyncHandler( async (req,res) => {
    res.status(200).json(req.user)
})

const generateJWT = (id) => {
    return jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn : '30d'
    })
}
module.exports = {
    userRegister,
    userLogin,
    getMe
}
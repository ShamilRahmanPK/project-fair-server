const { json } = require('express');
const users = require('../model/userModel')
const jwt = require('jsonwebtoken')

//  register
exports.registerController = async (req,res) => {
    console.log("Inside controler");
    const {username,email,password} = req.body
    console.log(username,email,password);

    try{
        const exisitingUser = await users.findOne({email})
        if (exisitingUser) {
            res.status(406).json("User Already exsist ")
        } else {
            const newUser = new users({
                username,email,password,github:"",linkdin:"",profilePic:""
            })

            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err) {
        res.status(401).json(err)
    }
}

// login

exports.loginController = async (req,res) => {
    console.log("Inside logincontroler");
    const {email,password} = req.body
    console.log(email,password);

    try{
        const exisitingUser = await users.findOne({email,password})
        if (exisitingUser) {
            // token genrate
            const token = jwt.sign({userId:exisitingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({
                user:exisitingUser,
                token
            })
        } else {
            res.status(404).json("invalid username or password")
        }
    }catch(err) {
        res.status(401).json(err)
    }
}
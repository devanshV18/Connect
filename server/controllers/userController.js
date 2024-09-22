const asynchHandler = require('express-async-handler')
const UserModel = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken')

const registerUser = asynchHandler( async(req,res) => {
    
        const {name, email, password, profile_pic} = req.body

        if(!name || !email || !password){
            res.status(400)
            throw new Error("Please fill necessary details")
        }


        const checkEmail = await UserModel.findOne({email})

        //CHeck if user already exists or not
        if(checkEmail){
            res.status(400).json({
                message: "The user with this email already exists"
            })
        }

        //if user is new , lets hash the passowrd
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //creating user
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            profile_pic
            })

        if(newUser){
            res.status(201).json({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                message: "User created Successfully",
            })
        }else{
            response.status(500).json({
                message: error.message || error,
                error: true
            })
        }
})

const checkEmail = asynchHandler( async( req,res ) => {

    const {email} = req.body

    const userExists = await UserModel.findOne({email}).select("-password")

    if(!userExists){
        res.status(400).json({
            success: false,
            message: "Any user with this email doesn't exists"
        })
    }else{
        res.json({
            success: true,
            message: "This email is registered",
            userExists
        })
    }
})

const checkPassword = asynchHandler( async(req,res) => {
    

    try {

        const { password, userId } = req.body

        if(!password){
            res.status(500).json({
                message: "Please enter your Password"
            })
        }

        const user = await UserModel.findById(userId)

        const verifyPassword = await bcrypt.compare(password, user.password)

        if(!verifyPassword){
            res.status(400).json({
            message: "Please check your Password",
            success: false
            })
        }

        const tokenData = {
            id: user._id,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })

        const cookieOptions = {
            http: true,
            secure: true
        }

        res.status(200).cookie('token', token, cookieOptions).json({
            message: "Logged in Successfully",
            token: token,
            success:true
        })
        } catch (error) {
            res.json({
                message: error.message || error,
                error: true,
                success: false
            })
        }
    })

    const userDetails = asynchHandler( async (req,res) => {
        try {
            const token = req.cookies.token || ""

            const user = await getUserDetailsFromToken(token)

            return res.status(200).json({
                message: "User Details",
                data: user
            })

        } catch (error) {
           res.status(500).json({
            message: error.message || error,
            error: true
           })
        }
    })

    const logout = asynchHandler( async(req,res) => {
        try {

            const cookieOptions = {
                http: true,
                secure: true
            }
            return res.cookie('token','', cookieOptions).status(200).json({
                message: "Session Timed Out",
                success: true
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message || error,
                error: true
            })
        }
    })

    const updateUserDetails = asynchHandler( async(req,res) => {
        try {
            const token = req.cookies.token || ""

            const user = await getUserDetailsFromToken(token)

            const { name, profile_pic, email } = req.body

            const updateUser = await UserModel.updateOne({_id: user._id}, {
                name, email, profile_pic
            })

            const userInformation = await UserModel.findById(user._id)

            return res.json({
                message: "User updated successfully",
                data: userInformation,
                success: true
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message || error,
                error: true
            })
        }
    })

    const searchUser = asynchHandler( async(req,res) => {
        try {
            const { search } = req.body
    
            const query = new RegExp(search,"i","g")
    
            const user = await UserModel.find({
                "$or" : [
                    { name : query },
                    { email : query }
                ]
            }).select("-password")
    
            return res.json({
                message : 'all user',
                data : user,
                success : true
            })
        } catch (error) {
            return res.status(500).json({
                message : error.message || error,
                error : true
            })
        }
    })

module.exports  = {registerUser, checkEmail, checkPassword, userDetails, logout, updateUserDetails, searchUser}
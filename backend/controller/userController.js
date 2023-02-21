const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

// @desc Register user
// @req POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = await req.body

    if (!name || !email || ! password) {
        res.status(400)
        throw new Error('please fill all the fields')
    }

    // user existance checked
    const userExist = await User.findOne({email})
    // console.log(userExist)
    if (userExist) {
        res.status(400)
        throw new Error('this email is already registered')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create a user
    const newUser = await User.create({
        name, 
        email,
        password: hashedPassword,
        
    })

    if (newUser) {
        res.status(201)
        res.json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid datat entered')
    }

})

// @desc Login user
// @req POST /api/users/login
// @access Public
const loginUser = asyncHandler(async(req, res) => {
    const  {email, password} = req.body
    const user = await User.findOne({email})

    // console.log(user)

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201)
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }
})

// @desc Get me user
// @req GET /api/users/me
// @access Public
const getMe = asyncHandler(async(req, res) => {
    // const {_id, name, email} = await User.findById(res.user.id)

    res.status(200).json(res.user)
})


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SEC, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}
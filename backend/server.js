const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./midware/errorMiddleWare')
const app = express()
const asyncHandler = require('express-async-handler')
const colors = require('colors')
const connectDB = require('./config/db')
const Goal = require('./model/goalModel')
const {protect} = require('./midware/authMiddleware')

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Goals conrtol
app.use('/api/goals', require('./routes/goalRoutes'))

//Users control
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`server started on port: ${port}`))
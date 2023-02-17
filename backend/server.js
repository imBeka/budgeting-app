const express = require('express')
const dotenv = require('dotenv').config()
const port = 5000
const {errorHandler} = require('./midware/errorMiddleWare')
const app = express()
const asyncHandler = require('express-async-handler')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/api/goals', asyncHandler(async (req, res) => {
    res.json({message: 'Get request'})
}))

app.post('/api/goals', asyncHandler( async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('please add some text')
    }
    res.json({message: 'Post request'})
}))

app.put('/api/goals/:id', asyncHandler(async (req, res) => {
    res.json({message: `Update request id: ${req.params.id}`})
}))

app.delete('/api/goals/:id', asyncHandler(async (req, res) => {
    res.json({message: `Delete request id: ${req.params.id}`})
}))

app.use(errorHandler)

app.listen(port, ()=> console.log(`server started on port: ${port}`))
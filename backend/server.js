const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const {errorHandler} = require('./midware/errorMiddleWare')
const app = express()
const asyncHandler = require('express-async-handler')
const colors = require('colors')
const connectDB = require('./config/db')
const Goal = require('./model/goalModel')

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/api/goals', asyncHandler(async (req, res) => {
    const goal = await Goal.find()

    res.status(200).json(goal)
}))

app.post('/api/goals', asyncHandler( async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('please add some text')
    }

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goal)
}))

app.put('/api/goals/:id', asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
}))

app.delete('/api/goals/:id', asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('deleting foal not found')
    }

    await goal.remove()

    res.status(200).json({id: req.params.id})
}))

app.use(errorHandler)

app.listen(port, ()=> console.log(`server started on port: ${port}`))
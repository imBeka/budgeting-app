const asyncHandler = require('express-async-handler')
const Goals = require('../model/goalModel')
const User = require('../model/userModel')

const getGoals = asyncHandler(async (req, res) => {
    // console.log(res)
    const goal = await Goals.find({user: res.user.id})

    res.status(200).json(goal)
})

const setGoal = asyncHandler( async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('please add some text')
    }
    // console.log(res)
    const goal = await Goals.create({
        text: req.body.text,
        user: res.user.id
    })

    res.status(200).json(goal)
})

const updateGoal = asyncHandler(async (req, res) => {
    // const userGoals = await Goals.find({user: res.user.id})
    const goal = await Goals.findById(req.params.id)
    const user = await User.findById(res.user.id)
    // console.log(user)
    // console.log(goal)

    //CHeck user
    if(!user) {
        res.status(401)
        throw new Error('User not foound')
    }

    //Check if logged in user is the same as the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Log in required')
    }

    if(!goal) {
        res.status(400)
        throw new Error('goal not found')
    }

    const updatedGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler(async (req, res) => {
    
    const goal = await Goals.findById(req.params.id)
    const user = await User.findById(res.user.id)
    // console.log(user)
    // console.log(goal)

    //CHeck user
    if(!user) {
        res.status(401)
        throw new Error('User not foound')
    }

    //Check if logged in user is the same as the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('Log in required')
    }

    if(!goal) {
        res.status(400)
        throw new Error('deleting foal not found')
    }

    await goal.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter some name']
    },
    
    email: {
        type: String,
        required: [true, 'please enter some email'],
        unique: true
    },
    
    password: {
        type: String,
        required: [true, 'please enter some password']
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema)
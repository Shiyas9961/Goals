const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'please enter name'],
    },
    email : {
        type : String,
        required : [true,'Please enter email'],
        unique : true
    },
    password : {
        type : String,
        required : [true,'Please enter password']
    }
})

module.exports = mongoose.model('Users',userSchema)
const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'users',
            required : true
        },
        text : {
            type : String,
            required : [true,'please enter text']
        }
    },
    {
        timestamps : true
    })

module.exports = mongoose.model('Goal',goalSchema)
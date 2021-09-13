const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    users: { type: Array },

    lastMessage: { type: String },
    message: [
        {
            sender: { type: String, required: true, },
            text: {
                type: String,
                
            },
            image : {type: String},
            date: { type: Date },
        }
    ]
}, {
    timestamps: true,

})




module.exports = mongoose.model('Chat', ChatSchema)
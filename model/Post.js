const mongoose = require('mongoose')


const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    image: { type: String },
    text: { type: String, required: true },
    video: { type: String },


    like: { type: Array, default: [] },
    comment: [
        {
            user: { type: String },
            commentText: { type: String, required: true },
            date: { type: Date },
            commentLike: { type: Array },
        }
    ]

}, {
    timestamps: true,

})


module.exports = mongoose.model('Post', PostSchema)
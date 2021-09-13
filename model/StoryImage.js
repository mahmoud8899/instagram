const mongoose = require('mongoose')


const StorySchema = mongoose.Schema({

    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref :'User',
        required: true,

    },
    image :{
        type: Array,
    },
    date: {
        type: Date,
    }
},{

    timestamps : true,
})


module.exports = mongoose.model('Story', StorySchema)
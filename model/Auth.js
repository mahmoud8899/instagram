const mongoose = require('mongoose')


const AuthSchema = mongoose.Schema({
    username: {type : String, required : true},
    email : {type: String, required : true},
    password : {type: String, required : true},
    isAdmin : {
        type : Boolean,
        required: true,
        default : false,
    },
    image : {
        type: String,

    },
    followare : {
        type: Array,
        default : [],
    },
    followings: {
        type: Array,
        default: [],
    },
    bio:{
        type: String,
    },
    Website :{
        type: String,
    },
    Phone:{
        type: Number,
    }
},{
    timestamps : true
})



module.exports = mongoose.model('User', AuthSchema)
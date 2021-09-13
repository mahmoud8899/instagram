const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')



const mongoose = require('mongoose');
require('dotenv').config();



//const MONGOOSE_URL = process.env.MONGOOSE_URL


mongoose.connect(process.env.MONGOOSE_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, info) => {
        if (!err) console.log('mongoose......')
    })




app.use([
    express.json(),
    express.urlencoded({ extended: true }),
    morgan('dev'),
   
    
])

/*
 cors({
        origin: "https://instagram-uppsala.herokuapp.com/",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })
*/


app.use('/*', (req, res, next) => {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
})



app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
//  router.... 
const AuthRouter = require('./router/Auth')
const PostrRouter = require('./router/PostModel')
const ChatRouter = require('./router/ChatModel')
const uploading = require('./router/uploading')
app.use('/api/',
    [
        AuthRouter,
        PostrRouter,
        ChatRouter,
        uploading
    ]

)






if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', (req, res) =>
    
        res.sendFile(path.resolve(__dirname,  'client', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running....')
    })
}


// send Message.. 
const sendMess = require('./SendMessage/sendMessage')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "https://instagram-uppsala.herokuapp.com/",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
})


let users = []

const addUsers = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
}

io.on('connection', socket => {

    // login user.... 
    socket.on('join', (userId) => {
        addUsers(userId, socket.id)
        io.emit('getUser', users)
        console.log(users)
    })





    // send message.. 
    socket.on('sendM', async ({ chatId, userId, text, lastUser, image }) => {
        //  console.log('commer',chatId, userId, text)
        const { error, saveChat } = await sendMess(chatId, userId, text, image)
        if (!error) {
            socket.emit('LoadingMess', saveChat)
            const user = await getUser(lastUser)
            if (user) {

                io.to(user.socketId).emit('sendigen', { userId, text, image })
                console.log('user is here....')

            } else {
                console.log('user not here now...')
            }


        }



    })


    // logo ut. user.... 
    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('getUser', users)
        console.log('logoUt.')
    })


})



http.listen(process.env.PORT || 5000, () => {
    console.log(`Server Runig.....`)
})









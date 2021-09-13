const ChatMedel = require('../model/ChatModel')
const Object = require('mongoose').Types.ObjectId


// create chat ....
exports.createChat = async (req, res) => {

    const { userId, lastId } = req.body

    let chat = await ChatMedel.findOne({ users: [req.body.userId, req.body.lastId] })


    if (!chat) {


        let chat = await ChatMedel.create({
            users: [
                req.body.userId,
                req.body.lastId
            ],
            lastMessage: ''
        })

        const newChat = await chat.save()
        return res.status(201).json(newChat)
    }
    else {

        return res.status(404).json({
            message: 'we have some chat...'
        })

    }

}

// send message
exports.sendMessage = async (req, res) => {

    if (!Object.isValid(req.params.id))
        return res.status(404).json({
            message: `id ${req.params.id}`
        })

    const { text } = req.body

    try {
        let chat = await ChatMedel.findById({ _id: req.params.id })
        if (chat) {
            const newSend = {
                sender: req.user._id,
                text,
                date: Date.now()
            }

            chat.message.push(newSend)
            chat.lastMessage = text
            const newSave = await chat.save()
            return res.status(201).json(newSave)
        } else {
            return res.status(404).json({
                message: 'We don t have a chat id'
            })
        }
    } catch (error) {

        return res.status(401).json({ message: error.message })
    }
}



// viwe the list for User... 
exports.viewUserChat = async (req, res) => {
    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `id ${req.params.id}` })

    let chat = await ChatMedel.find({ users: req.params.id }).sort({ createdAt: -1 })
    if (chat) return res.json(chat)
    else return res.status(401).json({ message: 'No chat now....' })
}



// chat id 
exports.chatID = async (req, res) => {

    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `id ${req.params.id}` })

    let chat = await ChatMedel.findById({ _id: req.params.id })
    if (chat) return res.json(chat)
    else return res.status(404).json({
        message: 'not chat..'
    })

}



// create chat and check ut if user have a chat 
exports.createandChatStory = async (req, res) => {


    const { image, text, sender, userId, lastUser } = req.body

    try {
        // const {lastUser,userId} =req.body
        let chat = await ChatMedel.findOne({
            users: [
                userId,
                lastUser
            ]
        })

        if (chat) {



            let newUser = await ChatMedel.findById(chat._id)

            //  return res.json(newUser)
            const neCreate = {
                sender,
                image,
                text,

            }

            newUser.message.push(neCreate)
            newUser.lastMessage = text


            const newSave = await newUser.save()

            return res.status(201).json(newSave)


        } else {


            


            let chat = new ChatMedel({
               users:[
                userId,
                lastUser,
               ],
               lastMessage: ''

            })

            let newSaveNotChat = await chat.save()


            let newChat = await ChatMedel.findById(newSaveNotChat._id)


            const newAdding = {
                image,
                text,
                sender,
            }


            newChat.lastMessage = text
            newChat.message.push(newAdding)

            const sistaMatch = await newChat.save()

            return res.status(201).json(sistaMatch)





        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}
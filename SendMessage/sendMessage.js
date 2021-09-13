const ChatModel = require('../model/ChatModel')
const Object = require('mongoose').Types.ObjectId


const sendMess = async (chatId, userId, text, image) => {

   // if (Object.isValid(chatId)) return { error: 'Not id' }


    let chat = await ChatModel.findById(chatId)

    if (chat) {

        const neSeNd = {
            sender: userId,
            text,
            image,
            date: Date.now()
        }

        chat.message.push(neSeNd)
        chat.lastMessage = text


        const saveChat = await chat.save()
        return { saveChat }

    } else {

        return { error: 'Not id chat...' }
    }



}


module.exports = sendMess
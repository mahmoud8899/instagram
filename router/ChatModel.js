const router = require('express').Router()
const ChatModel = require('../controller/ChatModel')
const verify = require('../Jwt/verify')





router.post('/chat/create/', ChatModel.createChat)
router.post('/chat/check/', ChatModel.createandChatStory)

router.post('/chat/:id/',   verify ,ChatModel.sendMessage)



router.get('/chat/chat/:id/', ChatModel.chatID)
router.get('/chat/user/:id/', ChatModel.viewUserChat)


module.exports = router
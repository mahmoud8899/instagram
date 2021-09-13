const router = require('express').Router()
const controllerAuth = require('../controller/Auth')
const multer = require('multer')
const path = require('path')
const verify = require('../Jwt/verify')
const ControllerStory = require('../controller/StoryImage')
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'uploads/')
    },
    filename (req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})


function checkFileTypes(file,cb){
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(extname && mimetype){
        cb(null , true)
    }else{
        cb('Image Only')
    }
}


const upload = multer({
    storage,
    fileFilter : function(req, file, cb){
        checkFileTypes(file,cb)
    }
})


router.post('/create/', controllerAuth.CreateUser)
router.get('/user/userlist/', controllerAuth.listUser)
router.post('/login', controllerAuth.Login)
router.get('/user/:id/', controllerAuth.userID)





router.post('/user/change/:id/', verify, controllerAuth.ChangeMyProfile)
// list Follow.
router.get('/user/listfollo/:id/', controllerAuth.listFollo)
router.get('/user/listfollwing/:id/', controllerAuth.listfollowings)
// change Username...
router.post('/user/username/:id/', controllerAuth.usernameChange)
router.post('/user/password/:id/', controllerAuth.changePassword)
// create story... 
router.get('/show/story/',    ControllerStory.showStoryImage)
router.post('/create/story/',  upload.single('image'), verify, ControllerStory.createStory)
// follow user....
router.post('/user/followare/:id/', verify, controllerAuth.Followare)


// private user Story....Image..>
router.post('/user/story/:id/', ControllerStory.PriveaStory)

// uploading Imge...
router.post('/user/uploadingimage/:id/',  upload.single('image'), verify,   controllerAuth.uploadingImage)

module.exports = router
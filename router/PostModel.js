const router  = require('express').Router()
const postModle = require('../controller/PostModel')
const verify = require('../Jwt/verify')

router.get('/post/', postModle.ShowPost)
router.post('/post/create/',verify, postModle.createPost)


router.get('/post/like/user/:id/',postModle.viewsLike)

router.get('/post/onlypost/:id/', postModle.onlyPost)
router.delete('/post/delete/:id/',  verify, postModle.DeleteUser)

// add Like...
router.put('/post/like/:id/', verify, postModle.addLike)
router.post('/post/comment/:id/', verify, postModle.addComment)

// delete comment... 

router.delete('/post/commetdelete/:id/:commentDelete/', verify, postModle.RemoveComment)

// edit comment.. 
router.put('/post/commentedit/:id/:commentEdit/', postModle.EditComment)

// private post 
router.post('/post/user/private/:id/', postModle.showPrivatePost)


// add like to comment..
router.put('/post/comment/:id/:commentId/',  verify, postModle.addLikecomment)
// delete comment...


module.exports = router
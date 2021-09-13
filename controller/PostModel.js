const PostModel = require('../model/Post')
const Object = require('mongoose').Types.ObjectId
const Auth = require('../model/Auth')



// create Post Image and Text ... 
exports.createPost = async (req, res) => {
    const { text, image, video } = req.body

    try {
        let post = await PostModel.create({
            user: req.user._id,
            image,
            text,
            video
        })

        const newPost = await post.save()
        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }


}



// see only post when use create that 
exports.onlyPost = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `not Post ${req.params.id}` })
    try {
        let post = await PostModel.findOne({ _id: req.params.id }).populate('user')
        if (post) return res.json(post)
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}
// show post.. 
exports.ShowPost = async (req, res) => {

    let post = await PostModel.find({}).sort({ createdAt: -1 })
        .populate('user')

    if (post) return res.json(post)
    else return res.status(404).json({ message: 'Not have Post Now....' })
}


// delete Post from user. 
exports.DeleteUser = async (req, res) => {

    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `id ${req.params.id}` })

    try {
        let post = await PostModel.findById({ _id: req.params.id })


        if (post) {
            if (post.user._id.toString() === req.user._id.toString()) {
                await PostModel.deleteOne({ _id: req.params.id })
                return res.json('Remove Post....')
            } else {
                return res.json({ message: 'en annan User ...' })
            }
        } else {
            return res.json({ message: 'not have post ...' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }

}



// add Like... to Post.. 
exports.addLike = async (req, res) => {
    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `NOT id ${req.params.id}` })

    try {
        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {

            if (!post.like.includes(req.user._id)) {

                await PostModel.updateOne({ _id: req.params.id }, { $push: { like: req.user._id } })
                return res.json('Add Like...')

                //  return res.json('yes')
            }
            else {
                await PostModel.updateOne({ _id: req.params.id }, { $pull: { like: req.user._id } })
                return res.json('Remove.. Like..')
            }

        } else {
            return res.status(404).json({ message: 'Not Post... ' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



// add comment 
exports.addComment = async (req, res) => {
    if (!Object.isValid(req.params.id))
        return res.status(404).json({
            message: `id ${req.params.id}`
        })
    const { commentText } = req.body

    try {
        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {

            const newComment = {
                user: req.user._id,
                commentText,
                date: Date.now()
            }
            post.comment.push(newComment)
            const saveComment = await post.save()
            return res.status(201).json(saveComment)

        } else {

            return res.status(404).json({ message: 'Not post.' })
        }
    } catch (error) {

        return res.status(404).json({ message: error.message })
    }

}



// add Like to Comment..  commentLike
exports.addLikecomment = async (req, res) => {
    if (!Object.isValid(req.params.id))
        return res.status(404).json({
            message: `id ${req.params.id}`
        })

    //  const {commentId} = req.body

    try {
        let post = await PostModel.findById({ _id: req.params.id })


        if (post) {
            const newFilter = post.comment.find((user) => user._id.toString() === req.params.commentId.toString())


            if (!newFilter.commentLike.includes(req.user._id)) {



                newFilter.commentLike.push(req.user._id)

                await post.save()
                return res.json({ message: 'Add Like to Comment' })

                //let mahmoud = await PostModel.findById(newFilter._id.toString())


            } else {
                newFilter.commentLike.remove(req.user._id)

                await post.save()
                return res.json({ mwssage: 'remove.. like to comment' })
                //  return res.json('Hve Like...')
            }

        } else {
            return res.status(404).json({ message: 'Not Post.' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




// remove Comment from user.. 
exports.RemoveComment = async (req, res) => {
    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `id : ${req.params.id}` })

    try {

        let post = await PostModel.findById({ _id: req.params.id })
        if (post) {

            const newDeleteComment = post.comment.find((uxx) => uxx._id.toString() === req.params.commentDelete.toString())
            if (newDeleteComment) {


                newDeleteComment.remove()

                await post.save()

                return res.json({ message: 'Remove Comment.' })


            } else {
                return res.json({ message: 'not have Comment id...' })
            }

        } else { }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




// Edit Comment 
exports.EditComment = async (req, res) => {
    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `id : ${req.params.id}` })

    try {

        let post = await PostModel.findById({ _id: req.params.id })
        const { commentText } = req.body
        if (post) {
            const filterCommetn = post.comment.find((comment) => comment._id.toString() === req.params.commentEdit.toString())

            if (filterCommetn) {


                filterCommetn.commentText = commentText
                filterCommetn.date = Date.now()


                await post.save()
                return res.json(post)
            }
            else {
                return res.json('not.')
            }
        } else {
            return res.json('not post.. ')
        }



    } catch (error) {
        return res.status(404).json({ message: error.message })
    }

}




// Post  Private page
exports.showPrivatePost = async (req, res) => {

    if(!Object.isValid(req.params.id)) return res.status(404).json({message: `id ${req.params.id}`})

    const { userId } = req.body


    try{
        let user = await Auth.findOne({ _id: req.params.id })
    if (user) {


        const checkUserFollo = user.followings.find((follo) => follo.toString() === userId.toString())

        const checkUserLoginPage = user._id.toString() === userId.toString()

        if (checkUserFollo || checkUserLoginPage) {

            let post = await PostModel.find({ user: [user._id ]})

            if (post) return res.json(post)
            else return res.json('not user')

        } else res.status(200).json({
            message: 'You must follow the User to see the diary'
        })


    } else {
        res.status(404).json({ message: 'You Have nothing' })
    }
    }catch(error){
        return res.status(404).json({
            message : error.mwssage
        })
    }




}



// view Like 
exports.viewsLike = async (req, res) => {

    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `not id ${req.params.id}` })

    let post = await PostModel.findById({ _id: req.params.id })
    if (post) {


        const ListLikeAll = await Promise.all(
            post.like.map((us) => {
                return Auth.findById(us)
            })
        )

        const listlik = []

        ListLikeAll.map((idx) => {
            const { _id, username, image } = idx
            listlik.push({ _id, username, image })
        })

        return res.json(listlik)
    }

}





/*



 //    const userCheck =  user.followare.find((use)=> use.toString() === userId.toString())

    const userCheck =  user.find((use)=> use._id === userId.toString())

         if( userCheck){

            return  res.json(userCheck)
           // let post  =  await PostModel.find({user : [user._id]})
          //  if(post) return  res.json(post)
          //  else return res.json({message : 'Not Post to user... '})


         }else{
            return res.status(200).json({
                message : 'not Post now...'
            })
         }





        // const checkUserFollow = user.find((nex)=> nex._id === userId)

        //   if(checkUserFollow){
        //     return res.json(checkUserFollow)
        /// }



    if(!Object.isValid(req.params.id))
    return res.status(404).json({message: `not id ${req.params.id}`})

    let post  = await PostModel.find({user : [req.params.id]})
    if(post) return  res.json(post)
    else return res.json({message : 'Not Post to user... '})
*/
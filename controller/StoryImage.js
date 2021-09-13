const Story = require('../model/StoryImage')
const Auth = require('../model/Auth')
const Object = require('mongoose').Types.ObjectId
// create Story from User... 
exports.createStory = async (req, res) => {



  try {
    let story = await Story.findOne({ user: req.user._id })

    if (story) {

      story.image.push(`/${req.file.path}`)

      const sev = await story.save()
      await res.json(sev)

      setTimeout(() => {

        const newxp = sev.remove()
        return res.json('Remove.....', sev)

      }, 15 * 60 * 1000)

    } else {

      let story = await Story.create({
        user: req.user._id,
        image: `/${req.file.path}`,
        date: Date.now()
      })

      const saveStory = await story.save()

      await res.status(201).json(saveStory)


      setTimeout(() => {

        const firstnewx = saveStory.remove()
        console.log('remove', firstnewx)

      }, 2 * 60 * 1000);
    }

  } catch (error) {

    return res.status(404).json({ message: error.message })
  }



}


//View followers' diaries only
exports.showStoryImage = async (req, res) => {

  let story = await Story.find({}).populate('user')
  if (story) return res.json(story)
  else return res.json({ message: 'Not Story Now...' })
  
      
   
}


// Private user page .
exports.PriveaStory = async (req, res) => {

  if (!Object.isValid(req.params.id))
    return res.status(404).json({ message: `id ${req.params.id}` })


  const { userFollo } = req.body


  try {
    let user = await Auth.findById({ _id: req.params.id })

    if (user) {
      // users check... 
      const usersCheck = user.followings.find((check) => check.toString() === userFollo.toString())

      const userYouself = user._id.toString() === userFollo.toString()

      if (usersCheck || userYouself) {


        let story = await Story.find({ user: [user._id] })

        return res.json(story)

        // return res.json(usersCheck)
      } else {
        return res.json({ message: `He answers you to follow ${user.username}` })
      }


    }
    else {
      return res.json({ message: 'There is no user here' })
    }
  } catch (error) {
    return res.status(404).json({
      message: error.message
    })
  }



}






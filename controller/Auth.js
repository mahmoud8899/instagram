
const Auth = require('../model/Auth')
const Object = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')
const JwtSingle = require('../Jwt/JwtSignl')





// create UserName... 
exports.CreateUser = async (req, res) => {

    const { email, password, username } = req.body

    try {
        let user = await Auth.findOne({ email })
        if (user) return res.status(404).json({ message: `we have some ${email}` })
        else {
            const hashPawword = await bcrypt.hash(password, 10)
            let user = new Auth({
                email,
                password: hashPawword,
                username,
            })

            const newUser = await user.save()
            return res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                isAdmin: newUser.isAdmin,
                email: newUser.email,
                followare: newUser.followare,
                followings: newUser.followings,
                token: JwtSingle(newUser._id)
            })
        }


    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }

}

// Login ... ... >>>
exports.Login = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await Auth.findOne({ email })
        if (!user) return res.status(404).json({ message: `we have some ${email}` })
        else {
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return res.status(404).json({ message: 'Not Match Password' })

            }

            return res.json({
                _id: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
                email: user.email,
                image: user.image,
                followare: user.followare,
                followings: user.followings,
                token: JwtSingle(user._id)
            })

        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


// User Id...
exports.userID = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `not id ${req.params.id}` })

    let user = await Auth.findById({ _id: req.params.id })
    if (user) return res.json(user)
    else return res.status(404).json({ message: 'Not User... ' })
}



// change my profile... 
exports.ChangeMyProfile = async (req, res) => {
    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `${req.params.id}` })

    const { bio, Website, Phone, username, email } = req.body

    try {
        let user = await Auth.findById({ _id: req.params.id })

        if (user) {


            user.username = username
            user.Phone = Phone
            user.Website = Website
            user.bio = bio
            user.email = email

            const newSave = await user.save()

            return res.status(201).json(newSave)


        } else {

            return res.json({ message: 'Not user.' })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }


}

// Change UserName... 
exports.usernameChange = async (req, res) => {

    const { username } = req.body

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })

    try {
        let user = await Auth.findById({ _id: req.params.id })
        if (user) {

            user.username = username

            const saveUser = await user.save()
            return res.status(201).json(saveUser)

        } else {
            return res.json({ message: 'not id.... ' })
        }
    } catch (error) {

    }
}


// user change password... 
exports.changePassword = async (req, res) => {


    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID ${req.params.id}` })
    const { password } = req.body
    try {
        let user = await Auth.findById({ _id: req.params.id })

        const hashPawword = await bcrypt.hash(password, 10)
        user.password = hashPawword
        const saveuser = await user.save()

        return res.json(saveuser)

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



// user List...
exports.listUser = async (req, res) => {

    let user = await Auth.find({}).select('-password')
    if (user) return res.json(user)
    else return res.status(404).json({ message: 'Not User...' })
}






// uploadin Image to User ... 
exports.uploadingImage = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID ${req.params.id}` })

    try {
        let user = await Auth.findById({ _id: req.params.id })

        if (user._id.toString() === req.user._id.toString()) {
            user.image = `/${req.file.path}`

            const saveUser = await user.save()

            return res.status(201).json(saveUser)
        } else {
            return res.json({ message: 'en annan User..' })
        }



    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}



// followare .... 
exports.Followare = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })

    try {
        let user = await Auth.findById({ _id: req.params.id })

        if (!user.followings.includes(req.user._id)) {


            await Auth.updateOne({ _id: req.params.id }, { $push: { followings: req.user._id } })
            await Auth.updateOne({ _id: req.user._id }, { $push: { followare: req.params.id } })

            return res.status(201).json({ message: 'Follow user...' })

            // return res.json(req.user._id)
        } else {


            await Auth.updateOne({ _id: req.params.id }, { $pull: { followings: req.user._id } })
            await Auth.updateOne({ _id: req.user._id }, { $pull: { followare: req.params.id } })

            return res.status(201).json({ message: 'unFollow user...' })
            // return res.json('no')
        }

    } catch (error) {

        return res.status(404).json({ message: error.message })
    }


}



// list Folloare....
exports.listFollo = async (req, res) => {
    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `Id ${req.params.id}` })

    try {
        let user = await Auth.findById({ _id: req.params.id })

        const Follow = await Promise.all(
            user.followare.map((userFollo) => {
                return Auth.findById(userFollo)
            })
        )


        const listFollow = []
        Follow.map((us) => {
            const { _id, username, image } = us
            return listFollow.push({ _id, username, image })
        })


        return res.json(listFollow)
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}



// list followings
exports.listfollowings = async (req, res) => {
    if (!Object.isValid(req.params.id))
        return res.status(404).json({ message: `id ${req.params.id}` })


    let user = await Auth.findById({ _id: req.params.id })

    if (user) {
        const listfollowings = await Promise.all(
            user.followings.map((followings) => {
                return Auth.findById(followings)
            })
        )


        let newfollowings = []
        listfollowings.map((ux) => {
            const { _id, username, image  } = ux
            return newfollowings.push({ _id, username, image })
        })

        return res.json(newfollowings)
    } else {

        return res.status(404).json({ message: '  Not User Id' })
    }
}





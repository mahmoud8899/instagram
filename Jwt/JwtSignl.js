const Jwt = require('jsonwebtoken')


 
const JwtSingle = (id) =>{

    return Jwt.sign({id}, process.env.SCRIPT_TOKEN, {
        expiresIn: '3d'
    })

}


module.exports = JwtSingle
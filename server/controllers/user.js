const User = require('../models/user')
const {compare} = require('../helpers/bcrypt')
const {sign} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
// const client = new OAuth2Client("446955434295-e4c0ioeh1pg6b5ened74fdhkjb7olujd.apps.googleusercontent.com")

class UserController {
    
    static getAll(req,res,next){
        User
        .find({})
        .then(users =>{
            res.status(200).json(users)
        })
        .catch(next)
    }

    static delete(req, res, next) {
      User.deleteOne({_id: req.params.id})
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
    }

    static register(req,res,next){
        let user = new User({
            name : req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: 'customer'
        })
        user.save()
        .then(value => {
            res.status(201).json(value)
        })
        .catch(next)
    }

    static login(req,res,next){
        User
        .findOne({email : req.body.email})
        .then(user =>{
          
            if(user){
                if(compare(req.body.password,user.password)){
                    let payload = {
                        email : user.email,
                        _id : user._id,
                        name: user.name,
                        role: user.role
                    }
                    let token = sign(payload)
                    res.status(200).json({
                        token,
                        name: user.name,
                        email : user.email,
                        role: user.role,
                        _id: user._id
                    })
                }else {
                    throw { code : 404, msg : `Invalid password`}
                }  
            }else{
                throw { code : 404, msg : `Email not found`}
            }
        })
        .catch(next)
    }

    // static loginGoogle(req,res,next){
    //     client
    //     .verifyIdToken({
    //         idToken: req.body.idToken,
    //         audience: "446955434295-e4c0ioeh1pg6b5ened74fdhkjb7olujd.apps.googleusercontent.com",
    //     })

    //     .then(function(ticket){
    //       const { email, name, picture } = ticket.getPayload()

    //       let password= name+'miniWP'
    //       let newUser={
    //           name: name,
    //           email: email,
    //           password: password
    //       }

    //       User.findOne({email: email})
    //       .then(user=>{
    //           if(user){
    //               console.log(user)
    //               let payload = {
    //                   id : user._id,
    //                   name: user.name,
    //                   email : user.email
    //               }

    //               let token = sign(payload)
    //               res.status(200).json({
    //                   token,
    //                   name : user.name,
    //                   email : user.email,
    //                   _id : user._id
    //               })
    //           }else{
    //               User.create(newUser)
    //               .then(user=>{
    //                   let payload = {
    //                       _id : user._id,
    //                       name: user.name,
    //                       email : user.email
    //                   }

    //                   let token = sign(payload)

    //                   res.status(200).json({
    //                       token,
    //                       name : user.name,
    //                       email : user.email
    //                   })
    //               })
    //               .catch(next)  
    //           }
    //       })
    //       .catch(next)
    //   })
    //   .catch(next)
    // }
}

module.exports = UserController
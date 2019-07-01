const User = require('../models/user')
const {compare} = require('../helpers/bcrypt')
const {sign} = require('../helpers/jwt')

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

}

module.exports = UserController
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {hash} = require('../helpers/bcrypt')

let userSchema = new Schema({
    name : {
      type: String,
      required : [true, 'Name must be inserted'],
    },
    email : {
        type : String,
        validate : [{
            validator: function validateEmail(email) 
                {
                    var re = /\S+@\S+\.\S+/;
                    return re.test(email);
                },
                message: props => `${props.value} is not a valid email`
        },
        {
            validator: function(){
                return new Promise((res, rej) =>{
                User.findOne({email: this.email})
                    .then(data => {
                        if(data) {
                            res(false)
                        } else {
                            res(true)
                        }
                    })
                    .catch(err => {
                        res(false)
                    })
                })
            }, message: 'Email already taken'
        }
    ],
        required : [true, 'Email must be inserted'],
    },
    password: {
      type: String,
      required : [true, 'Password must be inserted'],
      validate: {
        validator: function(input) {
          if (input.length > 7 && input.length < 14) return true
          else return false
        },
        message: props => `Password length must be between 8 to 13`
      }
    },
    role: String
})

userSchema.pre('save',function(next){
    this.password = hash(this.password)
    next()
})

let User = mongoose.model('user',userSchema)

module.exports = User
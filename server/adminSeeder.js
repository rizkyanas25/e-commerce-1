const User = require('./models/user')
const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost/eCom-dev`,{useNewUrlParser : true}, function (err) {
  if (err) console.log('connection to db failed')
  else {
    console.log(`connection to db eCom-dev success`)
  }
})

// change value inside admin object according to new admin data
const admin = {
  name: 'Admin Gundamku',
  email: 'admin@gundamku.co.id',
  password: 'gundamku',
  role: 'admin'
}

function adminSeeder() {
  return User.create(admin)
}

adminSeeder()
.then(createdAdmin => {
  console.log(`Success creating new Admin

  name       : ${admin.name}
  email      : ${admin.email}
  password   : ${admin.password}
  `)
  mongoose.disconnect()
})
.catch(err => {
  console.log(err.message.slice(24).split(': ')[1])
  mongoose.disconnect()
})
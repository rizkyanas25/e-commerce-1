// const chai = require('chai')
// const chaiHttp = require('chai-http')
// const expect = chai.expect
// const app = require('../app')
// const User = require('../models/user')
// const Product = require('../models/product')
// const Cart = require('../models/cart')
// const jwt = require('../helpers/jwt')

// chai.use(chaiHttp)

// let tokenAdmin = ''
// let tokenCustomer = ''
// let customer = {}
// let product1 = {}
// let product2 = {}
// let cart1 = {}
// let cart2 = {}
// let transaction = []

// before(done => {

//   let admin = {
//     name: 'Admin3 Gundamku',
//     email: 'admin3@gundamku.co.id',
//     password: 'gundamku',
//     role: 'admin'
//   }

//   User
//     .create(admin)
//     .then(user => {
//       let payload = {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//       tokenAdmin = jwt.sign(payload)
//     })
//     .catch(err => {
//       throw err
//     })

//   let kibutsuji = {
//     name: 'Kibutsuji Muzan',
//     email: 'kibutsuji@mail.com',
//     password: 'oninoouja',
//     role: 'customer'
//   }

//   User
//     .create(kibutsuji)
//     .then(user => {
//       customer = user
//       let payload = {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//       }
//       tokenCustomer = jwt.sign(payload)
//       customer = user
//     })
//     .catch(err => {
//       throw err
//     })
  
//   let newProduct1 = {
//     name: 'Destiny Gundam3 (HG)',
//     description: 'Tes',
//     category: 'HG',
//     price: 200000,
//     stock: 5,
//     image: 'https://d3fa68hw0m2vcc.cloudfront.net/6c9/112581488.jpeg'
//   }

//   let newProduct2 = {
//     name: 'Destiny Gundam4 (HG)',
//     description: 'Tes',
//     category: 'HG',
//     price: 250000,
//     stock: 5,
//     image: 'https://d3fa68hw0m2vcc.cloudfront.net/6c9/112581488.jpeg'
//   }
  
//   Product
//     .create(newProduct1)
//     .then(createdProduct => {
//       console.log('created')
//       product1 = createdProduct
//     })
//     .catch(err => {
//       throw err
//     })

//   Product
//     .create(newProduct2)
//     .then(createdProduct => {
//       console.log('created')
//       product2 = createdProduct
//     })
//     .catch(err => {
//       throw err
//     })
  
//   let newCart1 = {
//     productId: product1._id,
//     qty: 2,
//     userId: `${customer._id}`
//   }  

//   let newCart2 = {
//     productId: product2._id,
//     qty: 1,
//     userId: `${customer._id}`
//   }  

//   Cart
//     .create(newCart1)
//     .then(createdCart => {
//       cart1 = createdCart
//     })
//     .catch(err => {
//       throw err
//     })

//   Cart
//     .create(newCart2)
//     .then(createdCart => {
//       cart2 = createdCart
//       done()
//     })
//     .catch(err => {
//       throw err
//     })
  
// })

// after(done => {
//   User
//     .deleteMany({}, () => { })

//   Product
//     .deleteMany({}, () => { })
  
//   Cart
//     .deleteMany({}, () => { })
  
//   Transaction
//     .deleteMany({}, () => { done() })
// })

// describe ('TRANSACTION TEST', function() {
//   describe ('1. POST /transactions', function() {
//     it('1.1. should return status code 201 with respond body created trans', function(done) {
//       let newTransaction = {
//         items: [cart1, cart2]
//       }

//       chai
//         .request(app)
//         .post('/transactions')
//         .set('token', tokenCustomer)
//         .send(newTransaction)
//         .end(function(err, res) {
//           expect(err).to.be.null

//           expect(res).to.have.status(201)
//           expect(res.body).to.have.property('_id')
//           expect(res.body).to.have.property('items')
//           expect(res.body).to.have.property('totalPrice')
//           expect(res.body).to.have.property('userId')
//           expect(res.body).to.have.property('status')          

//           done()
//         })
//     })
//   })
// })
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const jwt = require('../helpers/jwt')

chai.use(chaiHttp)

let tokenAdmin = ''
let tokenCustomer = ''
let customer = {}
let product = {}

before(done => {

  let admin = {
    name: 'Admin2 Gundamku',
    email: 'admin2@gundamku.co.id',
    password: 'gundamku',
    role: 'admin'
  }

  User
    .create(admin)
    .then(user => {
      let payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
      tokenAdmin = jwt.sign(payload)
    })
    .catch(err => {
      throw err
    })

  let inosuke = {
    name: 'Inosuke Hashibira',
    email: 'inosuke@mail.com',
    password: 'kedamono',
    role: 'customer'
  }

  User
    .create(inosuke)
    .then(user => {
      customer = user
      let payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
      tokenCustomer = jwt.sign(payload)
    })
    .catch(err => {
      throw err
    })
  
  let newProduct = {
    name: 'Destiny Gundam2 (HG)',
    description: 'Tes',
    category: 'HG',
    price: 200000,
    stock: 5,
    image: 'https://d3fa68hw0m2vcc.cloudfront.net/6c9/112581488.jpeg'
  }
  
  Product
    .create(newProduct)
    .then(createdProduct => {
      product = createdProduct
      done()
    })
    .catch(err => {
      throw err
    })
  
})

after(done => {
  User
    .deleteMany({}, () => { })

  Product
    .deleteMany({}, () => { })
  
  Cart
    .deleteMany({}, () => { done() })
})

describe ('CART ITEM TEST', function() {
  describe ('1. POST /carts', function() {
    it('1.1. should return status code 201 with respond body created cart item', function(done) {

      let newCartItem = {
        productId: `${product._id}`,
        qty: 1,
      }

      chai
        .request(app)
        .post('/carts')
        .set('token', tokenCustomer)
        .send(newCartItem)
        .end(function(err, res) {
          expect(err).to.be.null

          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('productId')
          expect(res.body).to.have.property('qty')
          expect(res.body).to.have.property('userId')
          expect(res.body.productId).to.be.equal(`${product._id}`)
          expect(res.body.qty).to.be.equal(1)
          expect(res.body.userId).to.be.equal(`${customer._id}`)
          
          done()
        })
    }),

    it('1.2. should return status code 400 with respond body err msg only customer can access this feature', function(done) {
      let newCartItem = {
        productId: `${product._id}`,
        qty: 2,
      }

      chai
        .request(app)
        .post('/carts')
        .set('token', tokenAdmin)
        .send(newCartItem)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Only customer can access this feature')

          done()     
        })
    })

  }),

  describe('2. GET /carts', function() {
    it('2.1 should return status code 200 with respond body array of carts', function(done) {
      chai
        .request(app)
        .get('/carts')
        .set('token', tokenCustomer)
        .end(function(err, res) {
          expect(err).to.be.null

          expect(res).to.have.status(200)
          expect(res.body).to.be.an('array')

          done()
        })
    }),

    it('2.2 should return status code 401 with respond body err msg only customer can access this feature ', function(done) {
      chai
        .request(app)
        .get('/carts')
        .set('token', tokenAdmin)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Only customer can access this feature')

          done()
        })
    })
  })
})
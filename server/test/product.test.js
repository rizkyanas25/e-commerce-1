const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const jwt = require('../helpers/jwt')

chai.use(chaiHttp)

let tokenAdmin = ''
let tokenCustomer = ''


before(done => {

  let admin = {
    name: 'Admin Gundamku',
    email: 'admin@gundamku.co.id',
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

  let zenitsu = {
    name: 'Agatsuma Zenitsu',
    email: 'zenitsu@mail.com',
    password: 'kowaiiii',
    role: 'customer'
  }

  User
    .create(zenitsu)
    .then(user => {
      let payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
      tokenCustomer = jwt.sign(payload)
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
    .deleteMany({}, () => { done() })
})

describe ('PRODUCT TEST', function() {
  describe ('1. POST /products', function() {
    it('1.1. should return status code 201 with respond body created product', function(done) {
      
      let newProduct = {
        name: 'Destiny Gundam (HG)',
        description: 'Tes',
        category: 'HG',
        price: 200000,
        stock: 5,
        image: 'https://d3fa68hw0m2vcc.cloudfront.net/6c9/112581488.jpeg'
      }

      chai
        .request(app)
        .post('/products')
        .set('token', tokenAdmin)
        .send(newProduct)
        .end(function(err, res) {
          expect(err).to.be.null

          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('description')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('stock')
          expect(res.body).to.have.property('image')
          expect(res.body).to.have.property('slug')
          expect(res.body.name).to.be.equal('Destiny Gundam (HG)')
          expect(res.body.description).to.be.equal('Tes')
          expect(res.body.price).to.be.equal(200000)
          expect(res.body.stock).to.be.equal(5)
          expect(res.body.slug).to.be.equal('destiny-gundam-hg')

          done()     
        })

    }),

    it('1.2. should return status code 400 with respond body err msg name must be inserted', function(done) {
      let newProduct = {
        name: '',
        description: 'Tes',
        category: 'HG',
        price: 200000,
        stock: 5,
        image: 'https://d3fa68hw0m2vcc.cloudfront.net/6c9/112581488.jpeg'
      }

      chai
        .request(app)
        .post('/products')
        .set('token', tokenAdmin)
        .send(newProduct)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Product name must be inserted')

          done()     
        })
    }),

    it('1.3. should return status code 400 with respond body err msg description must be inserted', function(done) {
      let newProduct = {
        name: 'Destiny Gundam (HG)',
        description: '',
        category: 'HG',
        price: 200000,
        stock: 5,
        image: 'https://d3fa68hw0m2vcc.cloudfront.net/6c9/112581488.jpeg'
      }

      chai
        .request(app)
        .post('/products')
        .set('token', tokenAdmin)
        .send(newProduct)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Product description must be inserted')

          done()     
        })
    }),

    it('1.4. should return status code 400 with respond body err msg price must be more than 0', function(done) {
      let newProduct = {
        name: 'Destiny Gundam (HG)',
        description: 'Tes',
        category: 'HG',
        price: 0,
        stock: 5,
        image: 'https://d3fa68hw0m2vcc.cloudfront.net/6c9/112581488.jpeg'
      }

      chai
        .request(app)
        .post('/products')
        .set('token', tokenAdmin)
        .send(newProduct)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Product price must be more than 0')

          done()     
        })
    }),

    it('1.5. should return status code 400 with respond body err msg stock must be more than equal to 0', function(done) {
      let newProduct = {
        name: 'Destiny Gundam (HG)',
        description: 'Tes',
        category: 'HG',
        price: 200000,
        stock: -1,
        image: 'https://d3fa68hw0m2vcc.cloudfront.net/6c9/112581488.jpeg'
      }

      chai
        .request(app)
        .post('/products')
        .set('token', tokenAdmin)
        .send(newProduct)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Product stock must be more than equal to 0')

          done()     
        })
    }),

    it('1.6. should return status code 400 with respond body err msg category must be inserted', function(done) {
      let newProduct = {
        name: 'Destiny Gundam (HG)',
        description: 'Tes',
        category: '',
        price: 200000,
        stock: 1,
        image: 'https://d3fa68hw0m2vcc.cloudfront.net/6c9/112581488.jpeg'
      }

      chai
        .request(app)
        .post('/products')
        .set('token', tokenAdmin)
        .send(newProduct)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Product category must be inserted')

          done()     
        })
    })

    it('1.7. should return status code 400 with respond body err msg not authorized', function(done) {
      let newProduct = {
        name: 'Destiny Gundam (HG)',
        description: 'Tes',
        category: 'HG',
        price: 200000,
        stock: 1,
        image: 'https://d3fa68hw0m2vcc.cloudfront.net/6c9/112581488.jpeg'
      }

      chai
        .request(app)
        .post('/products')
        .set('token', tokenCustomer)
        .send(newProduct)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Unauthorized to access this feature')

          done()     
        })
    })
  })
})
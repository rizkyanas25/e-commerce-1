const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)

let newUser = {
  name: '',
  email: '',
  password: '',
  role: 'customer'
}

let loginUser = {
  email: '',
  password: ''
}

after(done => {
  User.deleteMany({
    role: {
      $ne: 'admin'
    }
  }, () => {
    done()
  })
})

describe ('USER TEST', function () {
  describe ('1. POST /register', function () {
    it('1.1. should return status code 201 with respond body created user', function (done) {
      newUser.name = 'Kamado Tanjiro'
      newUser.email = 'tanjiro@mail.com'
      newUser.password = 'nezukopoi'

      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.null

          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('password')
          expect(res.body).to.have.property('role')
          expect(res.body.name).to.be.equal('Kamado Tanjiro')
          expect(res.body.email).to.be.equal('tanjiro@mail.com')
          expect(res.body.role).to.be.equal('customer')

          done()
        })
    }),

    it('1.2. should return status code 400 with respond body err msg nezuko is not a valid email', function (done) {
      newUser.name = 'Kamado Nezuko'
      newUser.email = 'nezuko'
      newUser.password = 'kawaioni'

      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('nezuko is not a valid email')

          done()
        })
    }),

    it('1.3. should return status code 400 with respond body err msg nezuko@mail is not valid email', function (done) {
      newUser.name = 'Kamado Nezuko'
      newUser.email = 'nezuko@mail'
      newUser.password = 'kawaioni'

      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('nezuko@mail is not a valid email')

          done()
        })
    }),

    it('1.4. should return status code 400 with respond body err msg nezuko.com is not valid email', function (done) {
      newUser.name = 'Kamado Nezuko'
      newUser.email = 'nezuko.com'
      newUser.password = 'kawaioni'

      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('nezuko.com is not a valid email')

          done()
        })
    }),

    it('1.5. should return status code 400 with respond body err msg password length must be between 8 to 13', function (done) {
      newUser.name = 'Kamado Nezuko'
      newUser.email = 'nezuko@mail.com'
      newUser.password = 'kawai'

      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Password length must be between 8 to 13')

          done()
        })
    }),

    it('1.6. should return status code 400 with respond body err msg email already taken', function (done) {
      newUser.name = 'Kamado Nezuko'
      newUser.email = 'tanjiro@mail.com'
      newUser.password = 'kawaioni'

      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Email already taken')

          done()
        })
    }),

    it('1.7. should return status code 400 with respond body err msg name must be inserted', function (done) {
      newUser.name = ''
      newUser.email = 'nezuko@mail.com'
      newUser.password = 'kawaioni'

      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Name must be inserted')

          done()
        })
    }),

    it('1.8. should return status code 400 with respond body err msg email must be inserted', function (done) {
      newUser.name = 'Kamado Nezuko'
      newUser.email = ''
      newUser.password = 'kawaioni'

      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Email must be inserted')

          done()
        })
    }),

    it('1.9. should return status code 400 with respond body err msg password must be inserted', function (done) {
      newUser.name = 'Kamado Nezuko'
      newUser.email = 'nezuko@mail.com'
      newUser.password = ''

      chai
        .request(app)
        .post('/register')
        .send(newUser)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Password must be inserted')

          done()
        })
    })

  }),

  describe('2. POST /login', function() {
    it('2.1. should return status code 200 with respond body token and user info', function (done) {
      loginUser.email = 'tanjiro@mail.com'
      loginUser.password = 'nezukopoi'

      chai
        .request(app)
        .post('/login')
        .send(loginUser)
        .end(function(err, res) {
          expect(err).to.be.null

          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('token')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('role')
          expect(res.body.name).to.be.equal('Kamado Tanjiro')
          expect(res.body.email).to.be.equal('tanjiro@mail.com')
          expect(res.body.role).to.be.equal('customer')

          done()
        })
    }),

    it('2.2. should return status code 404 with respond body err invalid password', function (done) {
      loginUser.email = 'tanjiro@mail.com'
      loginUser.password = 'nezukopo'

      chai
        .request(app)
        .post('/login')
        .send(loginUser)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Invalid password')

          done()
        })
    }),

    it('2.3. should return status code 404 with respond body err email not found', function (done) {
      loginUser.email = 'tanji@mail.com'
      loginUser.password = 'nezukopoi'

      chai
        .request(app)
        .post('/login')
        .send(loginUser)
        .end(function(err, res) {
          expect(err).to.be.string

          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('msg')
          expect(res.body.msg).to.be.equal('Email not found')

          done()
        })
    })
  })
})
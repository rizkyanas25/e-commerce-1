const { verify } = require('../helpers/jwt');
const User = require('../models/user');
const Cart = require('../models/cart')


module.exports = {
  authenticate: function(req, res, next) {
    let token = req.headers.token;
    if (!token) {
      throw {code: 401, msg: 'You must login to access this endpoint'}
    } else {
      try {
        let decoded = verify(token);
        req.loggedUser = decoded
      } catch (err) {
        throw {code: 400, msg: 'Session Expired'}
      }
      User
        .findOne({
        email: req.loggedUser.email
        })
        .then(user => {
          if(user) {
            req.loggedUser = user;
            next();
          } else {
            throw {code: 401, msg: 'User is not valid'} 
         }
       })
       .catch(next)
    }
  },

  authorizeAdmin: function(req, res, next) {
    if (req.loggedUser.role === 'admin') {
      next()
    } else {
      next({code: 401, msg: 'Unauthorized to access this feature'})
    }
  },

  authorizeCustomer: function(req, res, next) {
    if(req.loggedUser.role === 'customer') {
      next()
    } else {
      next({code: 401, msg: 'Only customer can access this feature'})
    }
  },

  authorizeCart: function(req, res, next) {
    Cart.findOne({ _id: req.params.id })
    .then(cart => {
      if(`${cart.userId}` == `${req.loggedUser._id}`) {
        next()
      } else {
        res.status(401).json({ msg: 'Unauthorized' })
      }
    })
    .catch(err => { 
      res.status(500).json(err) 
    })
  }
}

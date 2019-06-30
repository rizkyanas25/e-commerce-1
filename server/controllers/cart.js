const Cart = require('../models/cart')
const Product = require('../models/product')

class CartController {

  static addCart (req, res, next) {
    Cart.findOne({productId: req.body.productId})
      .then(cart => {
        if (cart) {
          cart.set({qty: cart.qty + req.body.qty})
          cart.save()
          .then(updatedCart => {
            Product
            .findById(req.body.productId)
            .then(product => {
              product.set({
                stock: product.stock - req.body.qty
              })
              product.save()
              res.status(201).json(updatedCart)
            })
            .catch(next)
          })
        } else {
          let newCart = new Cart({
            productId: req.body.productId,
            qty: req.body.qty,
            userId: req.loggedUser._id
          })
          newCart.save()
            .then(cart => {
              return cart
            })
            .then(newCart => {
              Product
                .findById(req.body.productId)
                .then(product => {
                  product.set({
                    stock: product.stock - req.body.qty
                  })
                  product.save()
                  res.status(201).json(newCart)
                })
            })
            .catch( err => {
              throw err
            })
        }
      })
      .catch(next)

  }

  static findAll (req, res, next) {
    Cart
      .find({userId: req.loggedUser._id}, {}, {
        sort: {
          _id: -1
        }
      })
      .populate('productId')
      .then(carts => {
        res.status(200).json(carts)
      })
      .catch(next)
  }

  static deleteCart (req, res, next) {
    Cart
      .findById(req.params.id)
      .populate('productId')
      .then(cart => {
        return [cart.productId, cart]
      })
      .then(arr => {
        Product
          .findById(arr[0]._id)
          .then(product => {
            product.set({stock: product.stock + arr[1].qty})
            return product.save()
          })
          .then(updatedProduct => {
            Cart
              .deleteOne({_id: req.params.id})
              .then(value => {
                res.status(200).json(value)
              })
          })
      })
      .catch(next)

  }
}

module.exports = CartController
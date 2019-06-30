const Transaction = require('../models/transaction')
const Cart = require('../models/cart')

class TransactionController {
  static findUserTransaction (req, res, next) {
    Transaction
      .find({userId: req.params.userId},{},{
        sort: {
          updatedAt: -1
        }
      })
      .populate('userId')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static findAllTransaction (req, res, next) {
    Transaction
      .find({},{},{
        sort: {
          updatedAt: -1
        }
      })
      .populate('userId')
      .then(transactions => {
        res.status(200).json(transactions)
      })
      .catch(next)
  }

  static createTransaction  (req, res, next) {
    let newTransaction = {
      items: req.body.items,
      totalPrice: req.body.totalPrice,
      delivLocation: req.body.delivLocation,
      phoneNumber: req.body.phoneNumber,
      userId: req.loggedUser._id,
      status: 'waiting'
    }
    Transaction
      .create(newTransaction)
      .then(transaction => {
        console.log(transaction)
        return transaction
      })
      .then(newTransaction => {
        Cart
          .deleteMany({userId: req.loggedUser._id})
          .then(result => {
            console.log(result)
            res.status(201).json(newTransaction)
          })
      })
      .catch(next)
  }

  static updateStatusUser (req, res, next) {
    Transaction
      .findById(req.params.id)
      .then( trans => {
        let status = {
          status: ''
        }
        if (trans.status === 'waiting') status.status = 'verify'
        else if (trans.status === 'sent') status.status = 'closed'
        else throw {code:401, msg: 'You cant update this status'}
        trans.set(status)
        return trans.save()
      })
      .then(updatedTrans => {
        res.status(200).json(updatedTrans)
      })
      .catch(next)
  }

  static updateStatusAdmin (req, res, next) {
    Transaction
      .findById(req.params.id)
      .then( trans => {
        let status = {
          status: ''
        }
        if (trans.status === 'verify') status.status = 'verified'
        else if (trans.status === 'verified') status.status = 'sent'
        else throw {code:401, msg: 'You cant update this status'}
        trans.set(status)
        return trans.save()
      })
      .then(updatedTrans => {
        res.status(200).json(updatedTrans)
      })
      .catch(next)
  }
}

module.exports = TransactionController
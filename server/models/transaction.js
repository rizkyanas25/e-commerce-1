const mongoose = require('mongoose')
const Schema = mongoose.Schema

let transactionSchema = new Schema({
  items: [{
    type: Object,
    required: true
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'user',
    required: true
  },
  delivLocation : {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {timestamps: true})

let Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction
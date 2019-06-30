const mongoose = require('mongoose')
const Schema = mongoose.Schema

let cartSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId, ref: 'product' 
  },
  qty: {
    type: Number,
    min: [1, 'Product quantity must be more than 0'],
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId, ref: 'user'
  }
})

let Cart = mongoose.model('cart', cartSchema)

module.exports = Cart
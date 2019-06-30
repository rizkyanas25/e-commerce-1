const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug)
const Schema = mongoose.Schema

let productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name must be inserted']
  },
  description: {
    type: String,
    required: [true, 'Product description must be inserted']
  },
  category: {
    type: String,
    required: [true, 'Product category must be inserted']
  },
  price: {
    type: Number,
    min: [1, 'Product price must be more than 0'],
    required: true
  },
  stock: {
    type: Number,
    min: [0, 'Product stock must be more than equal to 0'],
    required: true
  },
  image: {
    type: String,
    required: [true, 'Product image must be inserted']
  },
  slug: { type: String, slug: "name", slugPaddingSize: 2, unique: true }
}, {timestamps: true})

let Product = mongoose.model('product', productSchema)

module.exports = Product
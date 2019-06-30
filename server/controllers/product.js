const Product = require('../models/product')

class ProductController {
  
  static findAllProduct (req, res, next) {
    Product
      .find({},{},{
        sort: {
          _id: -1
        }
      })
      .then(products => {
        res.status(200).json(products)
      })
      .catch(next)
  }

  static findOneProduct (req, res, next) {
    Product
      .find({slug: req.params.slug})
      .then(products => {
        res.status(200).json(products[0])
      })
      .catch(next)
  }

  static createProduct (req, res, next) {
    let newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      image: ''
    })
    if (req.file) newProduct.image = req.file.cloudStoragePublicUrl
    else newProduct.image = req.body.image
    newProduct.save()
      .then(product => {
        res.status(201).json(product)
      })
      .catch(next)
  }

  static updateProduct(req, res, next) {
    let setVal = {}
      req.body.name && (setVal.name = req.body.name) 
      if (!req.file) {
        setVal.image = req.body.image
      } else {
        setVal.image = req.file.cloudStoragePublicUrl
      }
      req.body.description && (setVal.description = req.body.description)
      req.body.price && (setVal.price = req.body.price)
      req.body.stock && (setVal.stock = req.body.stock)
      req.body.category && (setVal.category = req.body.category)
      Product
      .findById(req.params.id)
      .then(product =>{
          product.set(setVal)
          return product.save()
      })
      .then(updated =>{
          res.status(200).json(updated)
      })
      .catch(next)
  }

  static deleteProduct (req, res, next) {
    Product
      .deleteOne({_id: req.params.id})
      .then(value => {
        res.status(200).json(value)
      })
      .catch(next)
  }
}

module.exports = ProductController
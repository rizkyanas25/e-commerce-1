const router = require('express').Router()
const cartController = require('../controllers/cart')
const {authorizeCustomer, authorizeCart} = require('../middlewares/auth')

router.use(authorizeCustomer)
router.get('/', cartController.findAll)
router.post('/', cartController.addCart)
router.delete('/:id', authorizeCart, cartController.deleteCart)

module.exports = router
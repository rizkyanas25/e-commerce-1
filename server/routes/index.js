const router = require('express').Router()
const userController = require('../controllers/user')
const productRoute = require('../routes/product')
const cartRoute = require('../routes/cart')
const transactionRoute = require('../routes/transaction')
const { authenticate } = require('../middlewares/auth')
router.get('/', (req, res) => {res.status(200).json({message: 'Home'})})

router.post('/register', userController.register)
router.post('/login', userController.login)

router.use('/products', productRoute)
router.use(authenticate)
router.use('/carts', cartRoute)
router.use('/transactions', transactionRoute)

module.exports = router
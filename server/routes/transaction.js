const router = require('express').Router()
const transactionController = require('../controllers/transactions')
const {authorizeCustomer, authorizeAdmin} = require('../middlewares/auth')

router.get('/', authorizeAdmin, transactionController.findAllTransaction)
router.get('/:userId', authorizeCustomer, transactionController.findUserTransaction)
router.post('/', authorizeCustomer, transactionController.createTransaction)
router.patch('/:id', authorizeCustomer, transactionController.updateStatusUser)
router.patch('/:id/admin', authorizeAdmin, transactionController.updateStatusAdmin)

module.exports = router
const router = require('express').Router()
const userController = require('../controllers/user')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/', userController.getAll)
router.delete('/:id', userController.delete)

module.exports = router
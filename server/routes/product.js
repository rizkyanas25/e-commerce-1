const router = require('express').Router()
const productController = require('../controllers/product')
const {authenticate, authorizeAdmin} = require('../middlewares/auth')
const {multer, sendUploadToGCS}= require('../helpers/imageUpload')



router.get('/:slug', productController.findOneProduct)
router.get('/', productController.findAllProduct)

router.use(authenticate, authorizeAdmin)
router.post('/', multer.single('image'), sendUploadToGCS, productController.createProduct)
router.patch('/:id', multer.single('image'), sendUploadToGCS, productController.updateProduct)
router.delete('/:id',productController.deleteProduct)



module.exports = router
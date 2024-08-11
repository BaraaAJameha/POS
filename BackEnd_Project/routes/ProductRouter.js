var express = require('express')
var router = express.Router()
const productController = require('../controllers/ProductController')

const isAdmin = require('../middleware/isAdmin');
const isStaff = require('../middleware/isStaff');
const isAuthorized = require('../middleware/isAuthorized');

router.get('/products', isAdmin, productController.getAllProducts)
router.get('/productsv', isAuthorized, productController.getAllVisibleProducts)
router.get('/productsh', isAdmin, productController.getAllHiddenProducts)

router.post('/productv', isAuthorized, productController.getVisibleProduct)
router.post('/producth', isAdmin, productController.getHiddenProduct)

router.post('/namev', isAuthorized, productController.searchByNameVisible)
router.post('/nameh', isAdmin, productController.searchByNameHidden)
router.post('/name', isAdmin, productController.searchByName)

router.post('/products', isAdmin, productController.addNewProduct);

router.delete('/product', isAdmin, productController.deleteProduct)
router.put('/product', isAdmin, productController.updateProductByProductCode)

module.exports = router
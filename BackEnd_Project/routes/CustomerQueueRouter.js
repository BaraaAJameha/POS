var express = require('express')
var router = express.Router()
const customerQueueController = require('../controllers/CustomerQueueController');

router.delete('/allCustomerQueue', customerQueueController.removeAllFromCQ)

router.post('/customerQueue', customerQueueController.addToCQ)
router.get('/customerQueue', customerQueueController.getProducts)
router.delete('/customerQueue', customerQueueController.removeFromCQ)

module.exports = router;
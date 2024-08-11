var express = require('express')
var router = express.Router()
const billController = require("../controllers/BillController");


router.post("/bill", billController.addBill)

module.exports = router;
const { Product } = require('../models');
const db = require('../models');
const Products = require('../models/Products');
const CustomerQueue = db.CustomerQueue;
const Bill = db.Bill;
const BillItems = db.BillItems;

const addBill = async function (request, response) {

    var productDetails = await CustomerQueue
        .findAll({
            where: { user_id: request.user.user_id },
            include: Product
        })
        .then(async customerQueueData => {

            var billNumber = await Bill.max("bill_id")
            billNumber = !billNumber ? 0 : billNumber;
            billNumber = billNumber + 1;

            let allProductData = {
                allProductDetails: customerQueueData,
                bill_number: billNumber,
                message: "products are retrieved successfully"
            }
            return allProductData;

        })
        .catch(err => {
            response.status(500)
                .send({
                    message: err.message || 'An error occured while retrieving data from Customer Queue table'
                })
        })

    const billCreation = Bill
        .create({
            bill_id: productDetails.bill_number,
            bill_date: request.body.bill_date,
            status: "paid",
            user_id: request.user.user_id
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            response.status(500)
                .send({
                    message: err.message || 'An error occured while creating the bill record'
                })
        })

    if (billCreation != null) {
        productDetails.allProductDetails.forEach(product => {
            BillItems
                .create({
                    // bill_item_id: productDetails.bill_number,
                    Quantity: product.quantity,
                    bill_id: productDetails.bill_number,
                    barcode: product.barcode
                })
                .then(data => {

                })
                .catch(err => {
                    response.status(500)
                        .send({
                            message: err.message || 'An error occured while creating the bill item records'
                        })
                })
        })
        response
            .status(200)
            .send({
                message: "successful"
            })
    }
}

module.exports = {
    addBill
}

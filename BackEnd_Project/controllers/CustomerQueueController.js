const { Product } = require('../models');
const db = require('../models');
const Products = require('../models/Products');
const CustomerQueue = db.CustomerQueue;
const Bill = db.Bill;

//returns all the data that are in the customer's queue
const getProducts = async function (request, response) {

    await CustomerQueue
        .findAll({
            where: { user_id: request.user.user_id },
            include: Product
        })
        .then(async customerQueueData => {

            var billNumber = await Bill.max("bill_id")
            response.status(200)
                .send({
                    allProductDetails: customerQueueData,
                    bill_number: billNumber,
                    message: "products are retrieved successfully"
                })

        })
        .catch(err => {
            response.status(500)
                .send({
                    message: err.message || 'An error occured while retrieving data from Customer Queue table'
                })
        })
}

//improved crud
// adds on item to the custome's queue
const addToCQ = async (request, response) => {

    // get products quantity to check if we go above it
    const productQuantity = await Product.findOne(
        {
            where: {
                barcode: request.body.barcode
            }
        }
    )
        .then(product => {
            return product.quantity
        })
        .catch(error => {
            response
                .status(500)
                .send({
                    message: error.message || 'an error occured when getting products quantity'
                })
        })

    // console.log(productQuantity)


    // finds if the certain item is in that staff's particular customer's queue
    const staffCQ = await CustomerQueue
        .findOne({
            where: {
                user_id: request.user.user_id,
                barcode: request.body.barcode,
                cart_id: request.user.user_id
            }
        })

    if (!staffCQ) {
        // if there is not no product add that product with a quantity of //! 1 hard coded

        // checks if the newquantity is more than the product's quantity
        if (1 > productQuantity) {
            response
                .status(200)
                .send({
                    message: 'no more product is left to add',
                    code: 'noadd'
                })
            return
        }

        CustomerQueue
            .create(
                {
                    barcode: request.body.barcode,
                    state: 'v',
                    quantity: 1,
                    user_id: request.user.user_id,
                    cart_id: request.user.user_id
                }
            )
            .then(data => {
                response
                    .status(200)
                    .send({
                        message: 'added to CQ successfuly',
                        data: data
                    })
            })
            .catch(error => {
                response
                    .status(500)
                    .send({
                        message: error.message || 'an error occured while adding to CQ'
                    })
            })

    } else {
        // if there is we have to get the quantity and add //! 1 to it hard coded

        const newquantity = staffCQ.quantity + 1

        // checks if the newquantity is more than the product's quantity
        if (newquantity > productQuantity) {
            response
                .status(200)
                .send({
                    message: 'no more product is left to add',
                    code: 'noadd'
                })
            return
        }

        CustomerQueue
            .update(
                {
                    quantity: newquantity
                },
                {
                    where: {
                        user_id: request.user.user_id,
                        barcode: request.body.barcode,
                        cart_id: request.user.user_id
                    }
                }
            )
            .then(data => {
                response
                    .status(200)
                    .send({
                        message: 'updated successfully'
                    })
            })
            .catch(error => {
                response
                    .status(500)
                    .send({
                        message: error.message || 'an error occured while update the quantity'
                    })
            })
    }
}

// removes the entire item not removes one from the quantity 
const removeFromCQ = async (request, response) => {

    CustomerQueue
        .destroy({
            where: {
                user_id: request.user.user_id,
                barcode: request.body.barcode
            }
        })
        .then(data => {
            response
                .status(200)
                .send({
                    message: 'item deleted successfully'
                })
        })
        .catch(error => {
            response
                .status(500)
                .send({
                    message: error.message || 'an error occured while deletin item'
                })
        })

}

const removeAllFromCQ = async (request, response) => {

    // used to get all the products in the CQ and removes the quantity from the products
    await CustomerQueue.findAll(
        {
            where: {
                user_id: request.user.user_id
            }
        }
    )
        .then(productsCQ => {

            // loop through each product to subtract the sold quantity and if it reaches zero hide it
            productsCQ.forEach(async productCQ => {

                const ogProduct = await Product.findOne({ where: { barcode: productCQ.barcode } }).then(product => { return product }).catch(error => { response.status(500).send({ message: error.message || 'an error occured when getting the orignial product in rm all cq' }) })

                const newQuantity = ogProduct.quantity - productCQ.quantity
                const newHidden = newQuantity === 0 ? !ogProduct.hidden : ogProduct.hidden

                await Product.update(
                    {
                        quantity: newQuantity,
                        hidden: newHidden
                    },
                    {
                        where: {
                            barcode: ogProduct.barcode
                        }
                    }
                )
                    .then(data => {

                    })
                    .catch(error => {
                        response
                            .status(500)
                            .send({
                                message: error.message || 'an error occured when updateing products quantity'
                            })
                    })

                // console.log(ogProduct.barcode, ogProduct.quantity, productCQ.quantity, newQuantity, newHidden)
            })

        })
        .catch(error => {
            response
                .status(500)
                .send({
                    message: error.message || 'an error occured when getting all cq'
                })
        })

    // return

    CustomerQueue
        .destroy({
            where: {
                user_id: request.user.user_id,
            }
        })
        .then(data => {
            response
                .status(200)
                .send({
                    message: 'all item deleted successfully'
                })
        })
        .catch(error => {
            response
                .status(500)
                .send({
                    message: error.message || 'an error occured while deleting items'
                })
        })

}

module.exports = {
    getProducts,
    addToCQ,
    removeFromCQ,
    removeAllFromCQ
}

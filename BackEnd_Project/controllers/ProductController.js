const db = require('../models')
const Product = db.Product
const Op = db.Sequelize.Op

const getAllProducts = async (request, response) => {

    Product
        .findAll()
        .then(data => {
            response
                .status(200)
                .send(
                    {
                        data: data,
                        message: 'data taken'
                    }
                )
        })
        .catch(error => {
            response
                .status(500)
                .send(
                    {
                        message: error.message || 'An error occured while retrieving all of the products the data'
                    }
                )
        })

}
const getAllVisibleProducts = async (request, response) => {

    Product
        .findAll(
            {
                where: {
                    hidden: false,
                    quantity: {
                        [Op.gt]: 0
                    }
                }
            }
        )
        .then(data => {
            response
                .status(200)
                .send(
                    {
                        data: data,
                        message: 'data taken'
                    }
                )
        })
        .catch(error => {
            response
                .status(500)
                .send(
                    {
                        message: error.message || 'An error occured while retrieving all of the products the data'
                    }
                )
        })

}
const getAllHiddenProducts = async (request, response) => {

    Product
        .findAll(
            {
                where: {
                    hidden: true
                }
            }
        )
        .then(data => {
            response
                .status(200)
                .send(
                    {
                        data: data,
                        message: 'data taken'
                    }
                )
        })
        .catch(error => {
            response
                .status(500)
                .send(
                    {
                        message: error.message || 'An error occured while retrieving all of the products the data'
                    }
                )
        })

}

const getVisibleProduct = (request, response) => {

    barcode = request.body.barcode

    if (!barcode) {
        response
            .status(400)
            .send(
                {
                    message: 'the barcode is missing from the data'
                }
            )
    }

    Product
        .findOne(
            {
                where: {
                    barcode: barcode,
                    hidden: false,
                    quantity: {
                        [Op.gt]: 0
                    }
                }
            }
        )
        .then(data => {
            response
                .status(200)
                .send(
                    {
                        data: data
                    }
                )
        })
        .catch(error => {
            response
                .status(500)
                .send(
                    {
                        message: error.message || 'An error occured while displaying products'
                    }
                )
        })

}

const getHiddenProduct = (request, response) => {

    barcode = request.body.barcode

    if (!barcode) {
        response
            .status(400)
            .send(
                {
                    message: 'the barcode is missing from the data'
                }
            )
    }

    Product
        .findAll(
            {
                where: {
                    barcode: barcode
                }
            }
        )
        .then(data => {
            response
                .status(200)
                .send(
                    {
                        data
                    }
                )
        })
        .catch(error => {
            response
                .status(500)
                .send(
                    {
                        message: error.message || 'An error occured while displaying products'
                    }
                )
        })

}

const searchByNameVisible = (request, response) => {

    productName = request.body.name
    if (!productName) {
        response
            .status(203)
            .send(
                {
                    message: 'name is not in populated'
                }
            )
        return
    }

    Product
        .findAll(
            {
                where: {
                    name: {
                        [Op.substring]: productName,
                    },
                    quantity: {
                        [Op.gt]: 0
                    },
                    hidden: false
                }
            }
        )
        .then(data => {
            response
                .status(200)
                .send(
                    {
                        data
                    }
                )
        })
        .catch(error => {
            response
                .status(500)
                .send({
                    message: error.message || 'An error occured while search for product'
                })
        })

}

const searchByNameHidden = (request, response) => {

    productName = request.body.name
    if (!productName) {
        response
            .status(400)
            .send(
                {
                    message: 'name is not in populated'
                }
            )
    }

    Product
        .findAll(
            {
                where: {
                    name: {
                        [Op.substring]: productName
                    },
                    hidden: true
                }
            }
        )
        .then(data => {
            response
                .status(200)
                .send(
                    {
                        data
                    }
                )
        })
        .catch(error => {
            response
                .status(500)
                .send({
                    message: error.message || 'An error occured while search for product'
                })
        })

}

const searchByName = (request, response) => {

    productName = request.body.name
    if (!productName) {
        response
            .status(203)
            .send(
                {
                    message: 'name is not in populated'
                }
            )
        return
    }

    Product
        .findAll(
            {
                where: {
                    name: {
                        [Op.substring]: productName,
                    }
                }
            }
        )
        .then(data => {
            response
                .status(200)
                .send(
                    {
                        data
                    }
                )
        })
        .catch(error => {
            response
                .status(500)
                .send({
                    message: error.message || 'An error occured while search for product'
                })
        })

}

const addNewProduct = function (request, response) {

    if (!request.body.barcode
        && !request.body.name && !request.body.quantity
        && !request.body.size && !request.body.color && !request.body.price
        && !request.body.material && !request.body.hidden) {
        response.status(400).send({
            message: "BarCode, name, quantity, size, colors, price, material, hidden and user_id can not be empty!"
        });
        return;
    }


    const product = {
        barcode: request.body.barcode,
        name: request.body.name,
        quantity: request.body.quantity,
        size: request.body.size,
        color: request.body.color,
        price: request.body.price,
        material: request.body.material,
        hidden: request.body.hidden === 'yes' ? 1 : 0,
        user_id: request.body.user_id
    };

    // Save Tutorial in the database
    Product.create(product)
        .then(data => {
            response.send({
                message: 'item added successfully',
                data: data
            });
        })
        .catch(err => {
            response.status(500).send({
                message:
                    err.message || "Some error occurred while adding the Product."
            });
        });



}

const deleteProduct = (request, response) => {

    const barcode = request.body.barcode
    if (!barcode) {
        response
            .status(400)
            .send({
                message: 'barcode is not populated'
            })
    }

    Product
        .destroy({
            where: {
                barcode: barcode
            }
        })
        .then(num => {
            if (num == 1) {
                response.send({
                    message: "Product was deleted successfully."
                });
            } else {
                response.send({
                    message: `Cannot delete Product with barcode=${barcode}. Maybe Product was not found!`
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                error: error.message,
                message: "Error deleting Product with barcode=" + barcode
            })
        })

}

const updateProductByProductCode = async function (request, response) {

    // console.log(request.body)

    const oldbarcode = request.body.oldbarcode

    const barcode = request.body.barcode;
    const name = request.body.name;
    const quantity = request.body.quantity;
    const size = request.body.size;
    const color = request.body.color;
    const price = request.body.price;
    const material = request.body.material;
    const hidden = request.body.hidden === 'yes' ? 1 : 0;
    // const user_id = request.body.user_id; //!for what is user id again => not necessary in my opinion and it might create a constraint issue

    // check if the elements are empty
    if (!name || !quantity || !size || !color || !price || !material || !oldbarcode || !barcode) {
        console.log('empty')
        response.status(400).json("This data can not be empty")
        return
    }

    // check if the new barcode exists in order to not update it
    const existProduct = await Product.findOne(
        {
            where: {
                barcode: barcode
            }
        }
    )
        .then(product => {
            return product
        })
        .catch(error => {
            response
                .status(200)
            send({
                message: error.message || 'an error occured finding if a product exists'
            })
        })

    // check if a product exists in the database and it is not the same product that we are trying to update
    if (existProduct && barcode !== oldbarcode) {
        response
            .status(200)
            .send({
                message: 'barcode already exists'
            })
        return
    }

    // delete product to reinsert it
    await Product.destroy(
        {
            where: {
                barcode: oldbarcode
            }
        }
    )
        .then(data => {
            console.log('dest data')
        })
        .catch(error => {
            console.log('dest err')
            response
                .status(500)
                .send({
                    message: error.message || 'an error occured removing the item in the update process'
                })
        })

    // reinsert product by creating a new one
    await Product.create(
        {
            barcode: barcode,
            name: name,
            quantity: quantity,
            size: size,
            color: color,
            price: price,
            material: material,
            hidden: hidden
        }
    )
        .then(data => {
            console.log('cre data')
            response
                .status(200)
                .send({
                    message: 'item updated successfuly'
                })
        })
        .catch(error => {
            console.log('cre error')
            response
                .status(500)
                .send({
                    message: error.message || 'an error occured while creating an item in the update process'
                })
        })

    // the method is used to destroy and recreate and not update as an error will be faced if you update the product directly
}



module.exports = {
    getAllProducts,
    getAllVisibleProducts,
    getAllHiddenProducts,
    getVisibleProduct,
    getHiddenProduct,
    searchByNameHidden,
    searchByNameVisible,
    searchByName,
    addNewProduct,
    updateProductByProductCode,
    deleteProduct
}
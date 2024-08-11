module.exports = (sequelize, Sequelize) => {

    const CustomerQueue = sequelize.define(
        'customer_queue',
        {
            cart_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            state: {
                type: Sequelize.STRING(15)
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'user',
                    key: 'user_id'
                }
            },
            barcode: {
                type: Sequelize.STRING,
                primaryKey: true,
                references: {
                    model: 'product',
                    key: 'barcode'
                }
            }
        },
        {
            tableName: 'customer_queue',
            timestamps: false
        }
    )

    return CustomerQueue

}
module.exports = (sequelize, Sequelize) => {

    const Products = sequelize.define(
        'product',
        {
            barcode: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(50)
            },
            quantity: {
                type: Sequelize.INTEGER
            },
            size: {
                type: Sequelize.ENUM(
                    'XS',
                    'S',
                    'M',
                    'L',
                    'XL',
                    '2XL',
                    '3XL'
                )
            },
            color: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.INTEGER
            },
            material: {
                type: Sequelize.STRING(50)
            },
            hidden: {
                type: Sequelize.BOOLEAN
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'user',
                    key: 'user_id'
                }
            }
        },
        {
            tableName: 'product',
            timestamps: false
        }
    )

    return Products;

}
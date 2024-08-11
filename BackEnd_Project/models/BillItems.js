module.exports = (sequelize, Sequelize) => {

    const BillItems = sequelize.define(
        'bill_items',
        {
            bill_item_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Quantity: {
                type: Sequelize.INTEGER
            },
            bill_id:{
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'bill',
                    key: 'bill_id'
                }
            },
            barcode: {
                type: Sequelize.STRING,
                references: {
                    model: 'product',
                    key: 'barcode'
                }
            }
        },
        {
            tableName: 'bill_items',
            timestamps: false
        }
    )

    return BillItems;
    
}
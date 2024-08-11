module.exports = (sequelize, Sequelize) => {

    const Bills = sequelize.define(
        'bill',
        {
            bill_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            bill_date: {
                type: Sequelize.DATEONLY
            },
            status: {
                type: Sequelize.STRING
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
            tableName: 'bill',
            timestamps: false
        }
    )

    return Bills;

}
module.exports = (sequelize, Sequelize) => {

    const Users = sequelize.define(
        'user',
        {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            firstname: {
                type: Sequelize.STRING(30)
            },
            lastname: {
                type: Sequelize.STRING(30)
            },
            gender: {
                type: Sequelize.ENUM('male', 'female')
            },
            username: {
                type: Sequelize.STRING(30)
            },
            password: {
                type: Sequelize.STRING(255)
            },
            role: {
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING(50)
            }
        },
        {
            tableName: 'user',
            timestamps: false
        }
    )

    return Users;

}
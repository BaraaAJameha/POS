module.exports = (sequelize, Sequelize) => {

    const LoginLogoutTimes = sequelize.define(
        'login_logout_times',
        {
            login_datetime: {
                type: Sequelize.DATE,
                primaryKey: true
            },
            logout_datetime: {
                type: Sequelize.DATE
            },
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'user',
                    key: 'user_id'
                }
            }
        },
        {
            tableName: 'login_logout_times',
            timestamps: false
        }
    )

    return LoginLogoutTimes;

}
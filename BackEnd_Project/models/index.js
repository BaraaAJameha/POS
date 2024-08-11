require('dotenv').config()

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./Users')(sequelize, Sequelize)
db.LoginLogoutTimes = require('./LoginLogoutTimes')(sequelize, Sequelize)
db.Product = require('./Products')(sequelize, Sequelize)
db.Bill = require('./Bills')(sequelize, Sequelize)
db.BillItems = require('./BillItems')(sequelize, Sequelize)
db.CustomerQueue = require('./CustomerQueue')(sequelize, Sequelize)

db.Product.hasMany(db.BillItems, { foreignKey: 'barcode' })
db.BillItems.belongsTo(db.Product, { foreignKey: 'barcode' })

db.Product.hasMany(db.CustomerQueue, { foreignKey: 'barcode' })
db.CustomerQueue.belongsTo(db.Product, { foreignKey: 'barcode' })

db.User.hasMany(db.Bill, { foreignKey: 'user_id' })
db.Bill.belongsTo(db.User, { foreignKey: 'user_id' })

db.User.hasMany(db.CustomerQueue, { foreignKey: 'user_id' })
db.CustomerQueue.belongsTo(db.User, { foreignKey: 'user_id' })

db.User.hasMany(db.Product, { foreignKey: 'user_id' })
db.Product.belongsTo(db.User, { foreignKey: 'user_id' })

db.User.hasMany(db.LoginLogoutTimes, { foreignKey: 'user_id' })
db.LoginLogoutTimes.belongsTo(db.User, { foreignKey: 'user_id' })

db.Bill.hasMany(db.BillItems, { foreignKey: 'bill_id' })
db.BillItems.belongsTo(db.Bill, { foreignKey: 'bill_id' })

module.exports = db
const jwt = require('jsonwebtoken')
const helper = require('../helper/helper')
const db = require('../models')
const User = db.Users

const verifyToken = async function (request, response, next) {

    const token = request.headers['authorization']

    if (!token) return response.status(401).json({ error: 'Access Denied' })

    try {
        const bearer = token.split(' ')
        const bearerToken = bearer[1]
        const verified = jwt.verify(bearerToken, process.env.JWT_SECRET)

        var userdata = helper.parseJwt(bearerToken)
        const user = await User.findOne({ where: { usernmae: userdata.username } })

        request.user = user

        next()
    } catch (error) {
        response.status(400).json({ error: 'token not valid' })
    }
}

module.exports = verifyToken
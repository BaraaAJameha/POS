const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.User;
const loginLogout = db.LoginLogoutTimes;


const signup = async function (request, response) {

    const salt = await bcrypt.genSalt(15)

    const user = {
        user_id: request.body.user_id,
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        username: request.body.username,
        password: await bcrypt.hash(request.body.password, salt),
        role: request.body.role,
        email: request.body.email
    }

    const userOccurance = await User
        .findOne({
            where: {
                username: request.body.username
            }
        })
        .then(existUser => {
            return existUser;
        }).catch(err => {
            response
                .status(500)
                .send({
                    message: err.message || 'some error occured while checking the user'
                })
        })

    if (userOccurance == null) {
        User
            .create(user)
            .then(data => {
                response
                    .send({
                        message: "user created successfully",
                        username: data.username,
                        firstname: data.firstname,
                        lastname: data.lastname
                    })
            })
            .catch(err => {
                response
                    .status(500)
                    .send({
                        message: err.message || 'some error occured while creating the new user'
                    })
            })
    } else {
        response
            .status(200)
            .send({
                message: "User Is Already in The Database",
            })
    }



}

const login = async function (request, response) {

    const user = await User.findOne({
        where: {
            username: request.body.username
        }
    })

    if (!user) return response.status(202).send({ error: 'Invalid username' });

    const validPassword = await bcrypt.compare(request.body.password, user.password);

    if (!validPassword) return response.status(202).json({ error: 'Invalid Password' });

    const token = jwt.sign({
        username: user.username,
        user_id: user.user_id,
        role: user.role
    }, process.env.JWT_SECRET)


    var usersLoginTime = {
        login_datetime: Date.now(),
        logout_datetime: null,
        user_id: user.user_id
    }

    loginLogout.create(usersLoginTime)
        .then(data => {
            //cannt be added because the response is down   
        })
        .catch(err => {
            response
                .status(500)
                .send({
                    message: err.message || 'some error occured while adding users login logout times'
                })
        })

    response.status(200)
        .send({
            message: 'Logged in Successfully',
            user: user,
            token: token
        })

}

const userAccurance = function (request, response) {

    User
        .findOne({
            where: {
                username: request.body.username
            }
        })
        .then(data => {
            response
                .status(200)
                .send({
                    userdata: data
                })
        })
        .catch(err => {
            response
                .status(500)
                .send({
                    message: err.message || `An error occured whlie retrinving ${request.body.username}'s profile`
                })
        })

}

const getAllUsers = (request, response) => {

    User
        .findAll()
        .then(users => {
            response
                .status(200)
                .send(users)
        })
        .catch(error => {
            response
                .status(500)
                .send({
                    error: error.message || 'an error occured while getting all the users'
                })
        })

}

module.exports = {
    login,
    signup,
    userAccurance,
    getAllUsers
}
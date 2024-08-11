var express = require('express')
var router = express.Router()
const userController = require('../controllers/UserController');

const isAdmin = require('../middleware/isAdmin');
const isAuthorized = require('../middleware/isAuthorized');



router.post('/signup', isAdmin, userController.signup);
router.get('/users', isAdmin, userController.getAllUsers);
router.get('/user', isAuthorized, userController.userAccurance);

router.post('/login', userController.login);


module.exports = router
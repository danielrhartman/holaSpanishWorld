var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config');
var auth = jwt({
    secret: config.secret
});

router.use('/lessons', require('./lesson'));
router.use('/users', require('./user'));
router.use('/resources', require('./resources'));
//router.get('/user', auth, userCtrl.userRead);
//router.put('/user', auth, userCtrl.userUpdate);

var authCtrl = require('../controllers/authenticationController.js');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

module.exports = router;

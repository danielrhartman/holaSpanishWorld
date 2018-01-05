var userCtrl = require('../controllers/userController');
var router = require('express').Router();
var jwt = require('express-jwt');
var config = require('../config');
var auth = jwt({
    secret: config.secret
});

router.get('/', auth, userCtrl.readOne);

router.put('/', auth, userCtrl.update);
router.get('/instructors', auth, userCtrl.readInstructors);

module.exports = router;

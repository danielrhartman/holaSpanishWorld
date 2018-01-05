var lessonCtrl = require('../controllers/lessonController');
var router = require('express').Router();
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var config = require('../config');
var auth = jwt({
    secret: config.secret
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/group', lessonCtrl.readGroup);
router.post('/', lessonCtrl.add);
router.get('/group/next', lessonCtrl.readNextGroupLesson);
router.get('/private/user', auth, lessonCtrl.readUserPrivateLessons);
router.get('/private', auth, lessonCtrl.readOpenPrivateLessons);

module.exports = router;

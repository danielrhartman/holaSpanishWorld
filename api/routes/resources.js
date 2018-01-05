var resourceCtrl = require('../controllers/resourceController');
var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', resourceCtrl.add);

router.get('/:count', resourceCtrl.read);
router.get('/type/:type', resourceCtrl.readType);
//router.get('/:type/:title', resourceCtrl.readTitle);

module.exports = router;

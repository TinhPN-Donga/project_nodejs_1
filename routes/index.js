var express = require('express');
var router = express.Router();
const {AuthMiddleware} = require('../middlewares/index');
const {HomeController} = require('../controllers/index');

/* GET home page. */
router.get('/',AuthMiddleware.saveUserLocal, HomeController.homePage);

module.exports = router;

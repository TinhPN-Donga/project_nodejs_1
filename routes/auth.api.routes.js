var express = require('express');
var router = express.Router();

const { loginApi } = require('../controllers/auth.api.cotroller');

router.post('/', loginApi);

module.exports = router;

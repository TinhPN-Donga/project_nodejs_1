var express = require('express');
var router = express.Router();

const { AuthMiddleware } = require('../middlewares/index');
const { HomeController } = require('../controllers/index');
const { avatarUpload } = require('../utils/upload');

/* GET home page. */
router.get(
  '/',
  AuthMiddleware.saveUserLocal,
  HomeController.homePage
);

/* GET profile page. */
router.get(
  '/profile',
  AuthMiddleware.saveUserLocal,
  HomeController.profilePage
);

/* POST: cập nhật thông tin + avatar */
router.post(
  '/profile/update',
  AuthMiddleware.saveUserLocal,          // cần để có req.user
  avatarUpload.single('avatar'),         // multer xử lý file
  HomeController.updateProfile
);

module.exports = router;

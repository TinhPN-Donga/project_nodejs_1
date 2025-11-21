// controllers/home.controller.js
const path = require('path');
const fs = require('fs');
const { UserModel } = require('../models'); // dùng index.js đã export UserModel

// [GET] /
const homePage = (req, res) => {
  // Tùy bạn render gì ở trang home
  return res.render('index', {
    title: 'Trang chủ',
    user: req.user || null,
  });
};

// [GET] /profile
const profilePage = async (req, res) => {
  try {
    const userId = req.user && (req.user.id || req.user._id);
    if (!userId) {
      return res.redirect('/auth/login');
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.redirect('/auth/login');
    }

    // render views/pages/profile.ejs
    return res.render('pages/profile_page', { user });
  } catch (err) {
    console.error(err);
    return res.redirect('/auth/login');
  }
};

// [POST] /profile/update
const updateProfile = async (req, res) => {
  try {
    const userId = req.user && (req.user.id || req.user._id);
    if (!userId) return res.redirect('/auth/login');

    const user = await UserModel.findById(userId);
    if (!user) return res.redirect('/auth/login');

    const { fullName, phone } = req.body;

    const updateData = {
      fullName: fullName || user.fullName,
      phone: phone || user.phone,
    };

    // Nếu có file avatar mới
    if (req.file) {
      // Xóa avatar cũ nếu nó nằm trong /uploads/avatars
      if (user.avatar && user.avatar.startsWith('/uploads/avatars/')) {
        const oldPath = path.join(__dirname, '..', 'public', user.avatar);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updateData.avatar = '/uploads/avatars/' + req.file.filename;
    }

    await UserModel.findByIdAndUpdate(userId, updateData);

    return res.redirect('/profile');
  } catch (err) {
    console.error(err);
    return res.redirect('/profile');
  }
};

module.exports = {
  homePage,
  profilePage,
  updateProfile,
};

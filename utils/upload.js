// utils/upload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Hàm tạo storage upload vào /public/<subFolder>
function createDiskStorage(subFolder = 'uploads') {
  const uploadPath = path.join(__dirname, '..', 'public', subFolder);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname); // .jpg, .png...
      const base = (req.user && (req.user.id || req.user._id)) || 'user';
      cb(null, base + '-' + Date.now() + ext);    // 659b...-1712345678.png
    },
  });
}

// Upload riêng cho avatar
const avatarUpload = multer({
  storage: createDiskStorage('uploads/avatars'),
});

module.exports = {
  avatarUpload,
  createDiskStorage,
};

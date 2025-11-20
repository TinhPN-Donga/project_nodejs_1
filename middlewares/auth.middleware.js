// middlewares/auth.middleware.js
const { verifyToken } = require('../utils/jwt');

// Dùng để luôn gắn user (nếu có) vào req & res.locals
const saveUserLocal = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    const decoded = verifyToken(token);

    if (decoded) {
      req.user = decoded;
      res.locals.user = decoded; // dùng trong EJS
    } else {
      req.user = null;
      res.locals.user = null;
    }
  } else {
    req.user = null;
    res.locals.user = null;
  }

  next();
};

// Dùng để chặn: nếu CHƯA login -> redirect /auth/login
const requireLoginPage = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/auth/login');
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.redirect('/auth/login');
  }

  // Đã login
  req.user = decoded;
  res.locals.user = decoded;
  next();
};

module.exports = {
  saveUserLocal,
  requireLoginPage,
};

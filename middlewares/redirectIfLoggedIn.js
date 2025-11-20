const { verifyToken } = require('../utils/jwt');

const redirectIfLoggedIn = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return next(); // chưa login → cho vào trang login

    const decoded = verifyToken(token);

    if (!decoded) return next(); // token sai → cho login

    // 👉 ĐÃ LOGIN → đưa về trang home
    return res.redirect('/');
};

module.exports = redirectIfLoggedIn;

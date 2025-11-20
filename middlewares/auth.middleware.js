const { verifyToken } = require('../utils/jwt');

const saveUserLocal = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        const decoded = verifyToken(token);

        if (decoded) {
            req.user = decoded;
            res.locals.user = decoded;  // dùng trong EJS
        } else {
            // Token sai hoặc hết hạn
            req.user = null;
            res.locals.user = null;
        }
    } else {
        req.user = null;
        res.locals.user = null;
    }

    next();
};

module.exports = {
    saveUserLocal
};

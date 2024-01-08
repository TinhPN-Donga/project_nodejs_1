const saveUserLocal = (req, res, next) => {
    if (req.cookies.user) {
        req.user = JSON.parse(req.cookies.user);
        // res.locals.user = JSON.parse(req.cookies.user);
        res.locals.user = req.cookies.user;
    }else{
        res.locals.user = null;
    }
    next();
}

module.exports = {
    saveUserLocal
}
const { UserService } = require("../services/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const validate = require("../utils/validate");
const { signToken } = require("../utils/jwt");

const defaultResult = {
    message: "success",
    error: null,
    result: null
};

// GET LOGIN PAGE
const getLoginPage = async (req, res, next) => {
    res.render("pages/login_page");
};

// GET REGISTER PAGE
const getRegistePage = async (req, res, next) => {
    res.render("pages/register_page");
};

// REGISTER (JWT VERSION)
const register = async (req, res, next) => {
    try {
        const body = req.body;
        let newData = { ...body };

        // Validate password
        if (!newData.password || newData.password.length < 6) {
            throw new Error("Password must be at least 6 characters");
        }

        // Validate email
        if (!newData.email || !validate.isEmail(newData.email)) {
            throw new Error("Email is wrong");
        }

        // Check email exists
        const emailExisted = await UserService.findByEmail(newData.email);
        if (emailExisted) {
            throw new Error("Email already exists");
        }

        // Hash password
        const hashPass = bcrypt.hashSync(newData.password, saltRounds);
        newData = { ...newData, password: hashPass };

        // Create user
        const newUser = await UserService.create(newData);

        // Generate JWT token
        const token = signToken({
            id: newUser._id,
            email: newUser.email,
            username: newUser.username
        });

        // Save token to cookie
        res.cookie("token", token, { httpOnly: true });

        res.redirect("/");
    } catch (error) {
        res.redirect(`/auth/register?error=${error.message}`);
    }
};

// LOGIN (JWT VERSION)
const login = async (req, res, next) => {
    try {
        const body = req.body;

        if (!body.email || !validate.isEmail(body.email)) {
            throw new Error("Email or Password is wrong");
        }

        if (!body.password || body.password.length < 6) {
            throw new Error("Email or Password  is wrong");
        }

        const user = await UserService.findByEmail(body.email);
        if (!user) {
            throw new Error("Email is not exists");
        }

        let checkPass = await bcrypt.compare(body.password, user.password);
        if (!checkPass) {
            throw new Error("Email or Password  is wrong");
        }

        // Generate JWT
        const token = signToken({
            id: user._id,
            email: user.email,
            username: user.username
        });

        // Set token cookie
        res.cookie("token", token, { httpOnly: true });

        res.redirect("/");
    } catch (error) {
        res.redirect(`/auth/login?error=${error.message}`);
    }
};

// LOGOUT
const logout = async (req, res, next) => {
    if (req.cookies.token) {
        res.clearCookie("token");
    }
    res.redirect("/auth/login");
};

module.exports = {
    login,
    register,
    logout,
    getLoginPage,
    getRegistePage
};

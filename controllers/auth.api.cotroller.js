const { UserService } = require("../services/index");
const bcrypt = require("bcrypt");
const validate = require("../utils/validate");
const { signToken } = require("../utils/jwt");

const loginApi = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !validate.isEmail(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                error: true
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
                error: true
            });
        }

        // Check if user exists
        const user = await UserService.findByEmail(email);
        if (!user) {
            return res.status(400).json({
                message: "Email does not exist",
                error: true
            });
        }

        // Check password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                message: "Email or password is incorrect",
                error: true
            });
        }

        // Generate JWT
        const token = signToken({
            id: user._id,
            email: user.email,
            username: user.username
        });

        // Return response
        return res.status(200).json({
            message: "Login successful",
            error: null,
            token: token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
};

module.exports = {
    loginApi
};

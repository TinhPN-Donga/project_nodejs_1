const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";
const EXPIRE = "1d";

const signToken = (data) => {
    return jwt.sign(data, JWT_SECRET, { expiresIn: EXPIRE });
};

const verifyToken = (token) => {
    try {
        let data = jwt.verify(token, JWT_SECRET);
        console.log(data);
        return data;
    } catch (err) {
        return null;
    }
};

module.exports = { signToken, verifyToken };

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required : true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
    }
},{timestamps: true});


module.exports = mongoose.model('USER', UserSchema);

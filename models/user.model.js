const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    photos: [String],
    emailId: [String],
    credits:{
        type: Number,
        default: 0
    }
});

// mongoose.model('User', UserSchema, 'users')
const UserModel = mongoose.model('User', UserSchema, 'users');



module.exports = {
    UserModel
};
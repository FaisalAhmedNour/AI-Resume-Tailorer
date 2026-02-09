const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firebaseId: {
        type: String,
        required: true,
        unique: true
    },
    credits: {
        type: Number,
        default: 3
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

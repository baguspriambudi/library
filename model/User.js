const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, required: true, loowercase: true },
    password: { type: String, required: true },
    role_id: { type: String, default: 'user', enum: ['user', 'admin'] }
})

module.exports = mongoose.model('User', UserSchema)
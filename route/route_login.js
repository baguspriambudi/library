const JWT = require('jsonwebtoken');
const JWTsekret = process.env.JWT_KEY
const bcrypt = require('bcrypt');
const User = require('../model/User');
const http_succes = require('../help/http_responOk');
const http_error = require('../help/http_responError');

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const login = await User.findOne({ username: username })
        if (!login) {
            return http_error.http_responError_notfound(res, 'username not found')
        }
        const compare = bcrypt.compareSync(password, login.password)
        if (!compare) {
            return http_error.http_responError(res, 'password not match')
        }
        const token = JWT.sign({ _id: login._id, role_id: login.role_id }, JWTsekret, { expiresIn: '24h' })
        http_succes.http_responOk(res, 'succes login', token)
    } catch (error) {
        next(error);
    }
}
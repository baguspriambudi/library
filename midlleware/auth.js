const JWT = require('jsonwebtoken');
const JWTsekret = process.env.JWT_KEY
const User = require('../model/User');
const http_error = require('../help/http_responError');


exports.isAdmin = async (req, res, next) => {
    try {
        const headers = req.headers.authorization
        if (!headers) {
            return http_error.http_responError(res, 'please provide token')
        }

        const token = headers.split(' ')[1]
        const decode = JWT.verify(token, JWTsekret)
        req.user = decode

        const admin = await User.findById({ _id: req.user._id })
        if (!req.user._id || req.user.role_id != 'admin') {
            return http_error.http_responError_notfound(res, 'User is not acces')
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

exports.isUser = async (req, res, next) => {
    try {
        const headers = req.headers.authorization
        if (!headers) {
            return http_error.http_responError(res, 'please provide token')
        }

        const token = headers.split(' ')[1]
        const decode = JWT.verify(token, JWTsekret)
        req.user = decode

        const find = await User.findById({ _id: req.user._id })
        if (!find || req.user.role_id != 'user') {
            return http_error.http_responError_notfound(res, 'User is not acces')
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

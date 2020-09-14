const bcrypt = require('bcrypt');
const User = require('../model/User');
const http_succes = require('../help/http_responOk');
const http_error = require('../help/http_responError');

exports.insertUser = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const find = await User.findOne({ username: username.toLowerCase() })
        if (find) {
            return http_error.http_responError(res, 'username is already use')
        }
        const hashpassword = bcrypt.hashSync(password, 10)
        const user = await new User({ username: username, password: hashpassword }).save()
        http_succes.http_responOk(res, 'succesfully create user', user)
    } catch (error) {
        next(error)
    }
}

exports.insertAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const role_id = 'admin'
        const find = await User.findOne({ username: username.toLowerCase() })
        if (find) {
            return http_error.http_responError(res, 'username is already use')
        }
        const hashpassword = bcrypt.hashSync(password, 10)
        const user = await new User({ username: username, password: hashpassword, role_id: role_id }).save()
        http_succes.http_responOk(res, 'succesfully create admin', user)
    } catch (error) {
        next(error)
    }
}
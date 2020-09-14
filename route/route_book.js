const Book = require('../model/Book');
const User = require('../model/User');
const slug = require('slugify');
const http_succes = require('../help/http_responOk');
const http_error = require('../help/http_responError');

exports.insertBook = async (req, res, next) => {
    try {
        const { title, isbn, stock } = req.body
        const time = Date.now()
        const addslug = slug(req.body.title + '-' + time)
        const user = await User.findById({ _id: req.user._id });
        if (!user || req.user.role_id != 'admin') {
            return http_error.http_responError(res, 'user is not have access')
        }
        const book = await new Book({ title: title, isbn: isbn, stock: stock, slug: addslug }).save()
        http_succes.http_responOk(res, 'succesfully created book', book)
    } catch (error) {
        next(error)
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.user._id });
        if (!user || req.user.role_id != 'admin') {
            return http_error.http_responError(res, 'user is not have access')
        }
        const findbook = await Book.findById({ _id: req.query.id })
        if (!findbook) {
            return http_error.http_responError_notfound(res, 'book not found')
        }
        const time = Date.now()
        const addslug = slug(req.body.title + '-' + time)
        req.body.slug = addslug
        const updatebook = await Book.findOneAndUpdate(
            { _id: req.query.id },
            req.body,
            { new: true }
        )
        http_succes.http_responOk(res, 'succesfully created event', updatebook)
    } catch (error) {
        next(error)
    }
}

exports.viewBook = async (req, res, next) => {
    try {
        const view = await Book.find({})
        http_succes.http_responOk(res, 'succesfully view book', view)
    } catch (error) {
        next(error)
    }
}

exports.viewBookById = async (req, res, next) => {
    try {
        const viewbyid = await Book.findById(req.query.id)
        if (!viewbyid) {
            return http_error.http_responError_notfound(res, 'book not found')
        }
        http_succes.http_responOk(res, 'succesfully view book', viewbyid)
    } catch (error) {
        next(error)
    }
}

exports.viewBookBySlug = async (req, res, next) => {
    try {
        const viewbyid = await Book.findOne({ slug: req.query.slug })
        if (!viewbyid) {
            return http_error.http_responError_notfound(res, 'book not found')
        }
        http_succes.http_responOk(res, 'succesfully view book', viewbyid)
    } catch (error) {
        next(error)
    }
}
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const http_error = require('../help/http_responError');

exports.adduser = (req, res, next) => {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required().min(3),
            role_id: Joi.string().valid('user', 'admin')
        }).options({ abortEarly: false });

        const { error } = schema.validate(req.body);
        if (error) {
            return http_error.http_responValidation(res, 'validation error', error.details)
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

exports.login = (req, res, next) => {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        }).options({ abortEarly: false });

        const { error } = schema.validate(req.body);
        if (error) {
            return http_error.http_responValidation(res, 'validation error', error.details)
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

exports.addbook = (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string().required(),
            isbn: Joi.number().required(),
            stock: Joi.number().required(),
        }).options({ abortEarly: false });

        const { error } = schema.validate(req.body);
        if (error) {
            return http_error.http_responValidation(res, 'validation error', error.details)
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

exports.updatebook = (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string(),
            isbn: Joi.number(),
            stock: Joi.number()
        }).options({ abortEarly: false });

        const { error } = schema.validate(req.body);
        if (error) {
            return http_error.http_responValidation(res, 'validation error', error.details)
        }
        const schema2 = Joi.object({
            id: Joi.objectId().required()
        }).options({ abortEarly: false });

        const isvalid2 = schema2.validate(req.query);
        if (isvalid2.error) {
            return http_error.http_responValidation(res, 'validation error', isvalid2.error.details)
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

exports.viewbyid = (req, res, next) => {
    try {
        const schema2 = Joi.object({
            id: Joi.objectId().required()
        }).options({ abortEarly: false });

        const isvalid2 = schema2.validate(req.query);
        if (isvalid2.error) {
            return http_error.http_responValidation(res, 'validation error', isvalid2.error.details)
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

exports.viewbyslug = (req, res, next) => {
    try {
        const schema2 = Joi.object({
            slug: Joi.string().required()
        }).options({ abortEarly: false });

        const isvalid2 = schema2.validate(req.query);
        if (isvalid2.error) {
            return http_error.http_responValidation(res, 'validation error', isvalid2.error.details)
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

exports.pinjam = (req, res, next) => {
    try {
        const schema = Joi.object({
            user: Joi.objectId().required(),
            book: Joi.objectId().required(),
            tgl_pinjam: Joi.date().required(),
            tgl_kembali: Joi.date().required(),
        }).options({ abortEarly: false });

        const { error } = schema.validate(req.body);
        if (error) {
            return http_error.http_responValidation(res, 'validation error', error.details)
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

exports.kembali = (req, res, next) => {
    try {
        const schema = Joi.object({
            status: Joi.string()
        }).options({ abortEarly: false });

        const { error } = schema.validate(req.body);
        if (error) {
            return http_error.http_responValidation(res, 'validation error', error.details)
        }
        const schema2 = Joi.object({
            id: Joi.objectId().required()
        }).options({ abortEarly: false });

        const isvalid2 = schema2.validate(req.query);
        if (isvalid2.error) {
            return http_error.http_responValidation(res, 'validation error', isvalid2.error.details)
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

exports.viewtransactions = (req, res, next) => {
    try {
        const schema2 = Joi.object({
            user: Joi.objectId().required()
        }).options({ abortEarly: false });

        const isvalid2 = schema2.validate(req.query);
        if (isvalid2.error) {
            return http_error.http_responValidation(res, 'validation error', isvalid2.error.details)
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}

exports.viewtransactionsbooks = (req, res, next) => {
    try {
        const schema2 = Joi.object({
            book: Joi.objectId().required()
        }).options({ abortEarly: false });

        const isvalid2 = schema2.validate(req.query);
        if (isvalid2.error) {
            return http_error.http_responValidation(res, 'validation error', isvalid2.error.details)
        }
        next()
    } catch (error) {
        return http_error.http_responValidation(res, 'validation error', error.message)
    }
}
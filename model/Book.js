const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
    title: { type: String, required: true },
    isbn: { type: Number, required: true },
    stock: { type: Number, required: true },
    slug: { type: String }
})

module.exports = mongoose.model('Book', BookSchema)
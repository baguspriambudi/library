const mongoose = require('mongoose');

const TransaksiSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Book' },
    status: { type: String, required: true, enum: ['pinjam', 'kembali'] },
    tgl_pinjam: { type: Date, required: true },
    tgl_kembali: { type: Date, required: true }
})

module.exports = mongoose.model('Transaksi', TransaksiSchema)
const Transaksi = require('../model/Transaksi')
const Book = require('../model/Book');
const User = require('../model/User');
const { http_responOk, http_responOkdenda } = require('../help/http_responOk');
const { http_responError, http_responError_notfound, http_responValidation } = require('../help/http_responError');

exports.pinjam = async (req, res, next) => {
    try {
        const { user, book, tgl_pinjam, tgl_kembali } = req.body
        const status = 'pinjam'
        const finduser = await User.findById({ _id: req.user._id });
        if (!finduser || req.user.role_id != 'admin') {
            return http_responError(res, 'user is not have access')
        }
        const findbook = await Book.findById({ _id: req.body.book })
        if (!findbook) {
            return http_responError_notfound(res, 'book not found')
        }
        if (findbook.stock == 0) {
            return http_responError(res, 'stock book empty')
        }
        const findbookbyuser = await Transaksi.findOne({ user: user, book: book, status: 'pinjam' })
        if (findbookbyuser) {
            return http_responError(res, "user can't borrow the same book ")
        }
        const pinjam = await new Transaksi({ user: user, book: book, tgl_pinjam: tgl_pinjam, tgl_kembali: tgl_kembali, status: status }).save()
        if (pinjam) {
            await Book.updateOne(
                { _id: req.body.book },
                { stock: findbook.stock - 1 }
            )
        }
        http_responOk(res, 'succesfully insert data loan', pinjam)
    } catch (error) {
        next(error)
    }
}

exports.kembali = async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.user._id });
        const status = 'kembali'
        if (!user || req.user.role_id != 'admin') {
            return http_responError(res, 'user is not have access')
        }
        const transaksi = await Transaksi.findById({ _id: req.query.id })
        if (!transaksi) {
            return http_responError_notfound(res, 'transaction not found')
        }
        const update = await Transaksi.findOneAndUpdate(
            { _id: req.query.id },
            { status: status },
            { new: true }
        )
        const findbook = await Book.findById({ _id: update.book })
        if (update) {
            await Book.updateOne(
                { _id: update.book },
                { stock: findbook.stock + 1 })
        }
        // mencari perbandingan tgl dengan menghilangkan jam dalam bentuk mmdetik
        const datenow = new Date().setHours(0, 0, 0, 0)
        const dateback = new Date(transaksi.tgl_kembali).setHours(0, 0, 0, 0)
        if (datenow == dateback) {
            return http_responOk(res, 'succesfully back book', update)
        }
        // mencari selisih antara tgl kembali dengan tgl sekarang dalam bentuk mmdetik
        // Date.parse untuk mengkonvert tgl menjadi mmdetik
        const difdate = Math.abs(Date.parse(transaksi.tgl_kembali) - Date.now())
        // selisih dibagi mmdetik sehari
        const oneday = 60 * 60 * 24 * 1000
        const pembagian = difdate / oneday
        // membuat pembulatan kebawah dari hasil pembagian
        const floor = Math.floor(pembagian)
        const denda = floor * 5000
        http_responOkdenda(res, 'succesfully back book', denda)
    } catch (error) {
        next(error)
    }
}

exports.viewTransactionsbooks = async (req, res, next) => {
    try {
        const view = await Transaksi.find({ book: req.query.book, status: 'pinjam' }).populate({ path: 'user', select: '-password' })
        http_responOk(res, 'succesfully view transactions', view)
    } catch (error) {
        next(error)
    }
}

exports.viewTransactionsusers = async (req, res, next) => {
    try {
        const view = await Transaksi.find({ user: req.query.user, status: 'pinjam' }).populate('book')
        http_responOk(res, 'succesfully view transactions', view)
    } catch (error) {
        next(error)
    }
}

exports.viewTransactions = async (req, res, next) => {
    try {
        const view = await Transaksi.find({}).populate({ path: 'user', select: '-password' }).populate('book')
        http_responOk(res, 'succesfully view transactions', view)
    } catch (error) {
        next(error)
    }
}
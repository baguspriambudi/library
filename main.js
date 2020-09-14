const express = require('express');
const parser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const PORT = 6000
const app = express()
const dotenv = require('dotenv');

dotenv.config()

const Auth = require('./midlleware/auth')
const Schema = require('./midlleware/Schema')

const insert = require('./route/route_user')
const book = require('./route/route_book')
const login = require('./route/route_login')
const transaksi = require('./route/route_transaksi')

app.use(parser.json())
app.use(parser.urlencoded({ extended: true }))
app.use(morgan('combined'))

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log("mongodb connected"))
    .catch((err) => {
        console.log(err);
    });

const router = express.Router()
router.post('/auth/user', Schema.adduser, insert.insertUser)
router.post('/auth/admin', Schema.adduser, insert.insertAdmin)
router.post('/auth/login', Schema.login, login.login)
router.post('/book/create', Auth.isAdmin, Schema.addbook, book.insertBook)
router.post('/book/update', Auth.isAdmin, Schema.updatebook, book.updateBook)
router.get('/book/view', book.viewBook)
router.get('/book/view_by_id', Schema.viewbyid, book.viewBookById)
router.get('/book/view_by_slug', Schema.viewbyslug, book.viewBookBySlug)
router.post('/transaksi/pinjam', Auth.isAdmin, Schema.pinjam, transaksi.pinjam)
router.post('/transaksi/kembali', Auth.isAdmin, transaksi.kembali)
router.get('/transaksi/view_by_book', Auth.isAdmin, Schema.viewtransactionsbooks, transaksi.viewTransactionsbooks)
router.get('/transaksi/view_by_user', Auth.isAdmin, Schema.viewtransactions, transaksi.viewTransactionsusers)
router.get('/transaksi/view_transactions', Auth.isAdmin, transaksi.viewTransactions)
app.use('/api/v1', router)


app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        error: error.message,
    })
})

app.listen(PORT, console.log('listening on port ' + PORT));
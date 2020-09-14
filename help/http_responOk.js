exports.http_responOk = (res, msg, data) => {
    res.status(200).json({
        status: 200,
        msg,
        data
    })
}

exports.http_responOkdenda = (res, msg, denda) => {
    res.status(200).json({
        status: 200,
        msg,
        denda
    })
}
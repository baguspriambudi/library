exports.http_responError = (res, msg) => {
    res.status(400).json({
        status: 400,
        msg
    })
}

exports.http_responValidation = (res, msg, data) => {
    res.status(403).json({
        status: 403,
        msg,
        data
    })
}

exports.http_responError_notfound = (res, msg) => {
    res.status(404).json({
        status: 404,
        msg
    })
}
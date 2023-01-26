function getOriginURL(req) {
    const index = req.rawHeaders.findIndex(key => key === 'Origin')
    return req.rawHeaders[index + 1]
}

module.exports = { getOriginURL }
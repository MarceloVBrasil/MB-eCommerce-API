import { Request } from "express"

function getOriginURL(req: Request) {
    const index = req.rawHeaders.findIndex(key => key === 'Origin')
    return req.rawHeaders[index + 1]
}

export { getOriginURL }
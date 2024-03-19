import * as bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"

const { SECRET_KEY } = process.env

function generateJTW(payload: any, expiresIn: string) {
    const options = {
        expiresIn
    }

    return jwt.sign(payload, SECRET_KEY as string, options)
}

function verifyJWT(data: string): boolean {
    try {
        const [prefix, token] = data.split(' ')
        return prefix === 'Bearer' && !!jwt.verify(token, SECRET_KEY as string)
    } catch (error) {
        return false
    }
}

async function encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
}

function decodeJWT(token: string): any {
    token = token.split(' ')[1]
    const decodedToken = jwt.decode(token)
    return decodedToken
}

export { generateJTW, verifyJWT, encryptPassword, decodeJWT }
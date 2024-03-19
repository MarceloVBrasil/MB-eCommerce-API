import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { AuthFactory } from "../src/services/factories/AuthFactory";
import { decodeJWT } from "../src/services/helpers/AuthHelpers";

async function authenticate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    try {
        const authenticationService = AuthFactory()
        if (authorization) {
            const token = await authenticationService.refreshToken({ token: authorization })
            res.set("authorization", token)
            const decodedToken = decodeJWT(authorization)
            req.body.userId = decodedToken.id
            req.body.cartId = decodedToken.cartId
            next()
        }
        else {
            throw new Error("authorization token is required")
        }

    } catch (error: any) {
        res.status(401).json({ erro: error.message })
    }
};

export { authenticate }
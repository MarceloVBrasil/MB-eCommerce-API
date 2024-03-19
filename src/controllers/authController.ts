import { Request, Response } from "express"
import { AuthSchema } from "./schemas/AuthSchema"
import { AuthFactory } from "../services/factories/AuthFactory"

export class AuthController {

  async login(req: Request, res: Response) {
    try {
      const authSchema = new AuthSchema()
      const authServices = AuthFactory()

      const validData = await authSchema.login().validate({ ...req.body }, { stripUnknown: true, strict: true })
      const response = await authServices.login(validData.email, validData.password)
      res.json(response)
    } catch (error: any) {
      res.status(503).json({ erro: error.message })
    }
  }

  async register(req: Request, res: Response) {
    try {
      const authSchema = new AuthSchema()
      const authServices = AuthFactory()

      const validData = await authSchema.register().validate({ ...req.body }, { strict: true, stripUnknown: true })
      //const response = await authServices.register(validData)
      // res.json(response)
    } catch (error: any) {
      res.status(503).json({ erro: error.message });
    }
  }
}
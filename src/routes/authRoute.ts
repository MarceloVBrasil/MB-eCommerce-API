import { Router } from "express"
import { AuthController } from "../controllers/authController"

const authRoutes = Router()
const authController = new AuthController()

authRoutes.route("/login").post(authController.login);
authRoutes.route("/register").post(authController.login);

export { authRoutes }
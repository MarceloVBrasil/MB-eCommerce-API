import { Router } from "express"

const userRoutes = Router()
import { authenticate } from "../../middleware/authentication"
import { UserController } from "../controllers/userController"

const userController = new UserController()

userRoutes.route("/")
    .post(authenticate, userController.add)
userRoutes.route("/:id")
    .get(authenticate, userController.getById)
    .put(authenticate, userController.update)
    .delete(authenticate, userController.delete)

export { userRoutes }

import { Router } from "express"
import { authenticate } from "../../middleware/authentication";
import { CartController } from "../controllers/cartController";

const cartRoutes = Router()
const cartController = new CartController()

cartRoutes.route("/")
// .get(authenticate, cartController.getProducts)
// .post(authenticate, cartController.add)
// .put(authenticate, cartController.update)

cartRoutes.route("/open")
// .get(authenticate, cartController.getOpened)
export { cartRoutes }
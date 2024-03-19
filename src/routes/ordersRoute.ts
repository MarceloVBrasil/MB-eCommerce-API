import { Router } from "express"
import { OrderController } from "../controllers/orderController";
import { authenticate } from "../../middleware/authentication";

const orderRoutes = Router()
const orderController = new OrderController()

export { orderRoutes }
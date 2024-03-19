import { Router } from "express"
import { authenticate } from "../../middleware/authentication"
import { PurchaseController } from "../controllers/purchaseController";

const purchaseRoutes = Router()
const purchaseController = new PurchaseController()

// purchaseRoutes.route("/payment").post(authorize, purchaseController.processPayment)
// purchaseRoutes.route("/:productId").post(authorize, purchaseController.puItemOnHold);
// purchaseRoutes.route("/:productId").put(authorize, purchaseController.updatePurchaseQuantity);
// purchaseRoutes.route("/totalQuantity/:cartId").get(authorize, purchaseController.getTotalQuantityInCart);
// purchaseRoutes.route("/:cartId/:productId").get(authorize, purchaseController.getQuantityByProductId);
// purchaseRoutes.route("/check/:cartId/:productId").get(authorize, purchaseController.checkIfItemIsInCart);
// purchaseRoutes.route("/get/amount/:cartId").get(authorize,  purchaseController.getTotalAmount);


purchaseRoutes.route("/quantityPerProduct/:cartId")
    .get(authenticate, purchaseController.getQuantityPerProduct);

purchaseRoutes.route("/:productId")
    .post(authenticate, purchaseController.pay)

export { purchaseRoutes }
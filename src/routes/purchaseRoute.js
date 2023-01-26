const router = require("express").Router();
const purchaseController = require("../controllers/purchaseController");
const { PurchaseController } = require("../controllers/purchaseController");
const authorize = require('../../middleware/authorize');

// router.route("/payment").post(authorize, purchaseController.processPayment)
// router.route("/:productId").post(authorize, purchaseController.puItemOnHold);
// router.route("/:productId").put(authorize, purchaseController.updatePurchaseQuantity);
// router.route("/totalQuantity/:cartId").get(authorize, purchaseController.getTotalQuantityInCart);
// router.route("/quantityPerProduct/:cartId").get(authorize, purchaseController.getQuantityPerProduct);
// router.route("/:cartId/:productId").get(authorize, purchaseController.getQuantityByProductId);
// router.route("/check/:cartId/:productId").get(authorize, purchaseController.checkIfItemIsInCart);
// router.route("/get/amount/:cartId").get(authorize,  purchaseController.getTotalAmount);

router.route("/:userId")
    .post(PurchaseController.pay)

module.exports = router
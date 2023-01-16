const router = require("express").Router();
const ordersController = require("../controllers/orderController");
const authorize = require('../middleware/authorize');

router.route("/").get(authorize, ordersController.paymentSuccessful)
router.route("/:userId").get(authorize, ordersController.getOrdersByUserId)
router.route("/admin/send").post(ordersController.sendOrder)
router.route("/admin/:admin")
    .get(ordersController.getQuantityOfUndeliveredOrders)
router.route("/admin/:admin/orders")
    .get(ordersController.getAllOrders)

module.exports = router;
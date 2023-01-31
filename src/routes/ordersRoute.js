const router = require("express").Router();
const ordersController = require("../controllers/orderController");
const { OrderController } = require("../controllers/orderController");
const authorize = require('../../middleware/authorize');

// router.route("/").get(authorize, ordersController.paymentSuccessful)
// router.route("/:userId").get(authorize, ordersController.getOrdersByUserId)
// router.route("/admin/send").post(ordersController.sendOrder)
// router.route("/admin/:admin")
//     .get(ordersController.getQuantityOfUndeliveredOrders)
// router.route("/admin/:admin/orders")
//     .get(ordersController.getAllOrders)

router.route("/")
    .post(OrderController.add)
router.route("/admin")
    .get(OrderController.getAll)
router.route("/:userId")
    .get(OrderController.getByUserId)
router.route("/:userId/:orderId")
    .get(OrderController.getById)
module.exports = router;
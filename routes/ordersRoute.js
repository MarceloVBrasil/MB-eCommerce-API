const router = require("express").Router();
const ordersController = require("../controllers/orderController");
const authorize = require('../middleware/authorize');

router.route("/").get(authorize, ordersController.paymentSuccessful)
router.route("/:userId").get(authorize, ordersController.getOrdersByUserId)

module.exports = router;
const router = require("express").Router();
//const cartController = require("../controllers/cartController");
//const authorize = require('../../middleware/authorize');
const { CartController } = require("../controllers/cartController");

// router.route("/").post(authorize, cartController.createNewCart);
// router.route("/:userId").get(authorize, cartController.checkIfCartIsOpen);
// router.route("/:userId/:orderId").get(cartController.getProductsInCart);

router.route("/:userId")
    .get(CartController.getProducts)
    .post(CartController.add)
    .put(CartController.update)

module.exports = router;
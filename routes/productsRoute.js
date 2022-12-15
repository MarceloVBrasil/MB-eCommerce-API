const router = require("express").Router();
const productsController = require("../controllers/productController");

router.route("/").get(productsController.getAll);
router.route("/:productId").get(productsController.getProductById);

module.exports = router;

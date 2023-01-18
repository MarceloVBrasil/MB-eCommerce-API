const storage = require("../utils/storage")
const multer = require("multer")
const router = require("express").Router();
const productsController = require("../controllers/productController");

const upload = multer({ storage })

router.route("/").get(productsController.getAll);
router.route("/admin")
    .post(upload.single("file"), productsController.createProduct)
    .put(upload.single("file"), productsController.updateProduct);
router.route("/:productId").get(productsController.getProductById);

module.exports = router;

const { ProductController } = require("../controllers/productController");
const storage = require("../utils/storage")
const multer = require("multer")
const router = require("express").Router();
//const productsController = require("../controllers/productController");

const upload = multer({ storage })

// router.route("/").get(productsController.getAll);
// router.route("/admin")
//     .post(upload.single("file"), productsController.createProduct)
//     .put(upload.single("file"), productsController.updateProduct);
// router.route("/:productId").get(productsController.getProductById);

router.route("/")
    .get(ProductController.getAll)
    .post(ProductController.add)
router.route("/:id")
    .get(ProductController.getById)
    .put(ProductController.update)
    .delete(ProductController.delete)

module.exports = router;

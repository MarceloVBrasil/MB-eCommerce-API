import { Router } from "express"
import multer from "multer"
import { ProductController } from "../controllers/productController"
import { storage } from "../utils/storage"
import { authenticate } from "../../middleware/authentication"

const productController = new ProductController()

const upload = multer({ storage })

// router.route("/").get(productsController.getAll);
// router.route("/admin")
//     .post(upload.single("file"), productsController.createProduct)
//     .put(upload.single("file"), productsController.updateProduct);
// router.route("/:productId").get(productsController.getProductById);

const productRoutes = Router()

productRoutes.route("/")
    .get(authenticate, productController.getAll)
    .post(authenticate, upload.single("image"), productController.add)
productRoutes.route("/:id")
    .get(authenticate, productController.getById)
    .put(authenticate, upload.single("image"), productController.update)
    .delete(authenticate, productController.delete)

export { productRoutes }
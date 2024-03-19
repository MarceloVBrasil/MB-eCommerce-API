import { Router } from "express"
import { authenticate } from "../../middleware/authentication";
import { CommentController } from "../controllers/commentController";

const commentRoutes = Router()
const commentController = new CommentController()

commentRoutes.route("/:productId")
    .get(authenticate, commentController.getAll)
    .post(authenticate, commentController.add);

export { commentRoutes }
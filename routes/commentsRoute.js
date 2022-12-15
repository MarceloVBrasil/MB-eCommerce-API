const router = require("express").Router();
const commentController = require("../controllers/commentController");
const authorize = require('../middleware/authorize');

router.route("/:productId").get(commentController.getAll);
router.route("/:productId/").post(authorize, commentController.postComment);

module.exports = router;
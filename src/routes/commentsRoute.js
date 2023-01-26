const router = require("express").Router();
//const commentController = require("../controllers/commentController");
const authorize = require('../../middleware/authorize');
const { CommentController } = require("../controllers/commentController");

router.route("/:productId")
    .get(CommentController.getAll)
    .post(CommentController.add);

module.exports = router;
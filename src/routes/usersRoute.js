const router = require("express").Router();
// const userController = require("../controllers/userController");
const authorize = require('../../middleware/authorize');
const { UserController } = require("../controllers/userController");

//router.route("/:userId").put(authorize, userController.updateUser);

router.route("/")
    .post(UserController.add)
router.route("/:id")
    .get(UserController.getById)
    .put(UserController.update)
    .delete(UserController.delete)
router.route("/login")
    .post(UserController.login)

module.exports = router;

const router = require("express").Router();
const userController = require("../controllers/userController");
const authorize = require('../middleware/authorize');

router.route("/:userId").put(authorize, userController.updateUser);

module.exports = router;

const router = require("express").Router();
const cartController = require("../controllers/cartController");
const authorize = require('../middleware/authorize');

router.route("/").post(authorize, cartController.createNewCart);
router.route("/:userId").get(authorize, cartController.checkIfCartIsOpen);

module.exports = router;
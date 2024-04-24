const router = require("express").Router();
const authController = require("../controllers/authController");

//? Register Route
router.post("/register", authController.register);

//? Login Route
router.post("/login", authController.login);

module.exports = router;

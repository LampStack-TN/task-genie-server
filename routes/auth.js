const router = require("express").Router();
const authController = require("../controllers/authController");

//? Register Route
router.post("/register", authController.register);

// Todo: Login Route

module.exports = router;

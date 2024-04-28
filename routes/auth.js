const router = require("express").Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

//? Register Route
router.post("/register", authController.register);

//? Login Route
router.post("/login", authController.login);

//? Endpoint to verify token
router.get("/verify-token", verifyToken, authController.getAuthUser);

//? Endpoint to set userRole
router.put("/set-role", verifyToken, authController.setUserRole);

module.exports = router;

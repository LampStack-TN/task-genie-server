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

//?Endpoint to update user Info
router.put("/updateUser", verifyToken, authController.updateUser);
//Endpoint to update user password 
router.put("/updatePassword", verifyToken, authController.updateUserPassword);

module.exports = router;

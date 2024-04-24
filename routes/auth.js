const router = require("express").Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

//? Register Route
router.post("/register", authController.register);

//? Login Route
router.post("/login", authController.login);

router.get("/login", verifyToken, (req, res) => {
  res.send({ id: req.userId });
});

module.exports = router;

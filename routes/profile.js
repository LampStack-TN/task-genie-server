const router = require("express").Router();
const profileController = require("../controllers/profileController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/getProfile", verifyToken, profileController.getUserProfile);
router.post("/createProfile", verifyToken, profileController.createProfile);

module.exports = router;

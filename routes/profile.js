const router = require("express").Router();
const profileController = require("../controllers/profileController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/getProfile", verifyToken, profileController.getUserProfile);
router.post("/createProfile", verifyToken, profileController.createProfile);
router.put("/updateProfile", verifyToken, profileController.updateProfile);

module.exports = router;

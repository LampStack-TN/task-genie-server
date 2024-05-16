const router = require("express").Router();
const {
  getAllNotifications,
  setUpPushToken,
} = require("../controllers/notificationController");

const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getAllNotifications);
router.post("/add-token", verifyToken, setUpPushToken);

module.exports = router;

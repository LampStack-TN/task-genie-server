const router = require("express").Router();
const {
  getAllNotifications,
  setUpPushToken,
  readNotification,
} = require("../controllers/notificationController");

const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getAllNotifications);
router.post("/add-token", verifyToken, setUpPushToken);
router.get("/read/:id", verifyToken, readNotification);

module.exports = router;

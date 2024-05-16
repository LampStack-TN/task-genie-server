const router = require("express").Router();
const {
  getAllNotifications,
  readNotification,
} = require("../controllers/notificationController");

const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getAllNotifications);
router.get("/read/:id", verifyToken, readNotification);

module.exports = router;

const router = require("express").Router();
const {
  getAllNotifications,
} = require("../controllers/notificationController");

const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getAllNotifications);

module.exports = router;

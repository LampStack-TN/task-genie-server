const router = require("express").Router();
const chatController = require("../controllers/chatController");
const verifyToken = require("../middlewares/verifyToken");

//? Endpoint to get current user conversations
router.get("/conversation", verifyToken, chatController.getUserConversations);

module.exports = router;

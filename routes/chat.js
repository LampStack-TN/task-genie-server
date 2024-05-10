const router = require("express").Router();
const chatController = require("../controllers/chatController");
const verifyToken = require("../middlewares/verifyToken");

//? Endpoint to get current user conversations
router.get("/conversation", verifyToken, chatController.getUserConversations);

//? Endpoint to get conversation messages
router.get("/conversation/:id", verifyToken, chatController.getConversation);

//? Endpoint to get/create conversation with another user
router.get("/fecth-conversation/:participantId", verifyToken, chatController.fetchConversation);

//? Endpoint to send a "Text" message
router.post("/message", verifyToken, chatController.postMessage);

module.exports = router;

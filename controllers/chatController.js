const Conversation = require("../database/prisma").conversation;

// Get All conversations for current user
const getUserConversations = async (req, res) => {
  try {
    const { userId } = req;
    const conversations = await Conversation.findMany({
      where: {
        participants: { some: { userId: 10002 } },
      },
      include: { participants: true },
    });
    res.send(conversations);
  } catch (error) {
    res.status(404).send("Eroore");
  }
};

module.exports = {
  getUserConversations,
};

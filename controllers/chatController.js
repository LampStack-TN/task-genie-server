const Conversation = require("../database/prisma").conversation;

// Get All conversations for current user
const getUserConversations = async (req, res) => {
  try {
    const { userId } = req;
    const conversations = await Conversation.findMany({
      where: {
        participants: { some: { userId } },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                fullName: true,
                avatar: true,
              },
            },
          },
          where: {
            userId: {
              not: userId,
            },
          },
        },
        messages: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
          select: {
            senderId: true,
            type: true,
            content: true,
            createdAt: true,
          },
        },
      },
    });
    res.send(conversations);
  } catch (error) {
    console.log(error);
    res.status(404).send("Eroore");
  }
};

module.exports = {
  getUserConversations,
};

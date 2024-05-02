const { message } = require("../database/prisma");

const Conversation = require("../database/prisma").conversation;
const Message = require("../database/prisma").message;

//? Get All conversations for current user
const getUserConversations = async (req, res) => {
  try {
    const { userId } = req;
    const conversations = await Conversation.findMany({
      where: {
        participants: { some: { userId } },
      },
      include: {
        participants: {
          select: {
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

//? Get All messages for conversation
const getConversation = async (req, res) => {
  try {
    // Todo: Verify that the user is part of the conversation first.
    const { id } = req.params;
    const { userId } = req;
    console.log(Number(id));
    const conversation = await Conversation.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        participants: {
          select: {
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
          take: 5,
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

    conversation.messages.forEach((message) => {
      message.isMine = message.senderId == userId;
    });

    res.send(conversation);
  } catch (error) {
    console.log(error);
    res.status(404).send("Eroore");
  }
};

//? Post a message
const postMessage = async (req, res) => {
  try {
    const { userId } = req;
    const data = { ...req.body, senderId: userId };

    const message = await Message.create({
      data,
    });
    res.send(message);
  } catch (error) {
    console.log(error);
    res.status(404).send("Eroore");
  }
};

module.exports = {
  getUserConversations,
  getConversation,
  postMessage,
};

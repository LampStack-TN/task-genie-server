const Notification = require("../database/prisma").notification;
const User = require("../database/prisma").user;

const getAllNotifications = async (req, res) => {
  try {
    const { userId } = req;
    const response = await Notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

const setUpPushToken = async (req, res) => {
  try {
    const {
      userId,
      body: { pushToken },
    } = req;
    const response = await User.update({
      where: { id: userId },
      data: { pushToken },
    });
    res.status(201).send("push token good");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getAllNotifications,
  setUpPushToken,
};

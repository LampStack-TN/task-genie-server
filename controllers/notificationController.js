const Notification = require("../database/prisma").notification;

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

module.exports = {
  getAllNotifications,
};

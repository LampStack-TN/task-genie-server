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

const readNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.update({
      where: {
        id: Number(id),
      },
      data: {
        isRead: true,
      },
    });
    res.status(200).send("Marked As Read");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  getAllNotifications,
  readNotification,
};

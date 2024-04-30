const prisma = require("../database/prisma.js");

const likeTask = async (req, res) => {
  const { userId } = req;
  const { taskId } = req.body;
  try {
    const existingLike = await prisma.favouriteTasks.findUnique({
      where: {
        userId_taskId: {
          userId: userId,
          taskId: taskId,
        },
      },
    });
    if (!existingLike) {
      const result = await prisma.favouriteTasks.create({
        data: {
          userId: userId,
          taskId: taskId,
        },
      });
      res.status(201).send(result);
    } else {
      res.status(409).send({ message: "Task already liked." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error liking the task." });
  }
};

const getFavoriteTasks = async (req, res) => {
  const { userId } = req;
  try {
    const result = await prisma.favouriteTasks.findMany({
      where: {
        userId: userId,
      },
      include: {
        task: true,
      },
    });
    res.status(200).json(result.map((ele) => ele.task));
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error retrieving favorite tasks.Try again" });
  }
};

module.exports = { likeTask, getFavoriteTasks };

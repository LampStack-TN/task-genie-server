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
      .send({
        message: "Error retrieving favorite tasks.Please try again later.",
      });
  }
};

const unlikeTask = async (req, res) => {
  const { userId } = req;
  const { taskId } = req.body;
  try {
    const result = await prisma.favouriteTasks.delete({
      where: {
        userId_taskId: {
          userId: userId,
          taskId: taskId,
        },
      },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .send({
        message:
          "Error removing the task from favorites.Please try again later.",
      });
  }
};

module.exports = { likeTask, getFavoriteTasks, unlikeTask };

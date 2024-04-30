const prisma = require("../database/prisma.js");

const toggleLikeTask = async (req, res) => {
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

    if (existingLike) {
      await prisma.favouriteTasks.delete({
        where: {
          userId_taskId: {
            userId: userId,
            taskId: taskId,
          },
        },
      });
      res
        .status(204)
        .send({
          message: "Task has been successfully removed from your favorites.",
        });
    } else {
      const result = await prisma.favouriteTasks.create({
        data: {
          userId: userId,
          taskId: taskId,
        },
      });
      res.status(201).send(result);
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error toggling the favorite status of the task." });
  }
};

const getFavoriteTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await prisma.task.findMany({
      where: {
        favouriteTasks: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        client: true,
        _count: {
          select: { favouriteTasks: true },
        },
      },
    });
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error retrieving favorite tasks.Please try again later.",
    });
  }
};

module.exports = {
  toggleLikeTask,
  getFavoriteTasks,
};

const Task = require("../database/prisma").task;
const CreateTask = async (req, res) => {
  console.log("tested");
  try {
    const { userId } = req;
    const {
      description,
      title,
      location,
      minPrice,
      maxPrice,
      dueDate,
      urgency,
      skills,
    } = req.body;
    const response = await Task.create({
      data: {
        description,
        title,
        location,
        minPrice,
        maxPrice,
        dueDate,
        urgency,
        clientId: userId,
        skills: {
          connect: skills.map((id) => ({ id })),
        },
      },
      include: {
        skills: true,
      },
    });
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        "Unable to create the task. Please verify your data and try again.",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const { userId } = req;

    const tasks = await Task.findMany({
      include: {
        skills: true,
        client: true,
        applications: { where: { applicantId: userId } },
        _count: {
          select: {
            applications: { where: { applicantId: userId } },
            favouriteTasks: { where: { userId } },
          },
        },
      },
    });

    tasks.forEach((task) => {
      task.liked = task._count.favouriteTasks > 0;
      task.applied = task._count.applications > 0;
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).send({
      message: "Unable to retrieve tasks at this time. Please try again later.",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const {
      userId,
      params: { id },
    } = req;

    const task = await Task.findUnique({
      where: { id: parseInt(id) },
      [1 && "include"]: {
        skills: true,
        client: true,
        applications: { where: { applicantId: userId } },
        _count: {
          select: {
            applications: { where: { applicantId: userId } },
            favouriteTasks: { where: { userId } },
          },
        },
      },
    });
    if (!task) {
      res
        .status(404)
        .send({ message: "Task not found. Verify and try again." });
    } else {
      task.liked = task._count.favouriteTasks > 0;
      task.applied = task._count.applications > 0;
      res.send(task);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving task details. Please try again later.",
    });
  }
};

const getOneClient = async (req, res) => {
  try {
    const {
      userId,
      params: { id },
    } = req;

    const task = await Task.findUnique({
      where: { id: Number(id) },
      include: {
        skills: true,
        client: true,
        applications: {
          include: { applicant: { include: { profile: true } } },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    });
    if (!task) {
      res
        .status(404)
        .send({ message: "Task not found. Verify and try again." });
    } else {
      // check if
      task.acceptedApplication = task.applications.reduce((prev, app) => {
        return app.status === "Accepted" ? app : prev;
      }, null);
      task.applications = task.acceptedApplication ? [] : task.applications;
      res.send(task);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Error retrieving task details. Please try again later.",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Task.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send(response);
  } catch (err) {
    res.status(404).send({ message: "Unable to delete task. Task not found." });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const response = await Task.update({
      where: { id: parseInt(id) },
      data,
    });
    res.send(response);
  } catch (err) {
    res.status(404).send({ message: "Unable to update task. Task not found." });
  }
};

const getMyTasks = async (req, res) => {
  try {
    const { userId } = req;
    console.log(req.userId);
    const tasks = await Task.findMany({
      where: {
        clientId: userId,
      },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        "Unable to retrieve your tasks at this time. Please try again later.",
    });
  }
};

module.exports = {
  CreateTask,
  getAll,
  getOne,
  deleteTask,
  updateTask,
  getMyTasks,
  getOneClient,
};

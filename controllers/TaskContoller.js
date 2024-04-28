const Task = require("../database/prisma").task;

const CreateTask = async (req, res) => {
  try {
    const {
      description,
      title,
      location,
      minPrice,
      maxPrice,
      dueDate,
      urgency,
      clientId,
      skills,
    } = req.body;
    console.log(req.body);
    const response = await Task.create(
      {
        data: {
          description,
          title,
          location,
          minPrice,
          maxPrice,
          dueDate,
          urgency,
          clientId,
          skills: {
            connect: skills.map((id) => ({ id })),
          },
        },
        include: {
          skills: true,
        },
      }
    );
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};
const getAll = async (req, res) => {
  try {
    const tasks = await Task.findMany({
      include: {
        skills: true,
        client: true,
        _count: {
          select: { applications: true },
        },
      },
    });
    res.json(tasks);
  } catch (err) {
    console.log(err);
  }
};
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findUnique({
      where: { id: parseInt(id) },
      include: {
        skills: true,
        client: true,
      },include:{
        _count: {
          select: { applications: true },
        },
      }
    });
    res.send(task);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Task.delete({
      where: { id: parseInt(id) },
    });
    console.log(response);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
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
    console.log(err);
    res.status(404).send(err);
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
    console.error(error);
  }
};

module.exports = {
  CreateTask,
  getAll,
  getOne,
  deleteTask,
  updateTask,
  getMyTasks,
};

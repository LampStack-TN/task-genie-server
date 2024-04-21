const Task = require("../database/prisma").task;

const CreateTask = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const response = await Task.create({ data });
    console.log(response);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const getAll = async (req, res) => {
  try {
    const tasks=await Task.findMany()
    res.json(tasks)
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
        client: true,
      },
    })
    res.send(task);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Task.delete({
      where: { id: parseInt(id) },
    });
    console.log(response)
    res.send(response);
  } catch (err) {
    console.log(err);
    res.send(err);
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
    res.send(err);
  }
};

module.exports = { CreateTask, getAll, getOne, deleteTask, updateTask };

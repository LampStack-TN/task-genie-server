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
  //Todo : getAll Tasks
};
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Task.findUnique({ where: {id: parseInt(id)}} );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
module.exports = { CreateTask, getAll, getOne };

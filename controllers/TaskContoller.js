const { task } = require("../database/prisma");

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
module.exports = { CreateTask };

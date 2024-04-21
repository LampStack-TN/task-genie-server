const { user } = require("../database/prisma");

// import User prisma Model
const User = require("../database/prisma").user;

//? Register Handler
const register = async (req, res) => {
  try {
    const response = await User.create({ data: req.body });
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// Todo: Login Handler

module.exports = { register };

const { user } = require("../database/prisma");
const bcrypt = require("bcrypt");

// import User prisma Model
const User = require("../database/prisma").user;

//? Register Handler
const register = async (req, res) => {
  try {
    // deconstruct password for hashing
    const { password } = req.body;
    // copy req.body
    const data = { ...req.body };

    // hash password
    data.password = bcrypt.hashSync(password, 8);

    // execute query
    const response = await User.create({ data });

    // sernd query response
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

// Todo: Login Handler

module.exports = { register };

const User = require("../database/prisma").user;

const register = async (req, res) => {
//   console.log(await User.findMany());
  res.send("you have reached registration controller");
};

module.exports = { register };

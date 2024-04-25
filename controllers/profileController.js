const User = require("../database/prisma").user;

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: true,
      },
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Unvalid Profile");
  }
};
module.exports = { getUserProfile };

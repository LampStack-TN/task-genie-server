const { profile } = require("../database/prisma");
const { connect } = require("../routes/profile");

const User = require("../database/prisma").user;
const Profile = require("../database/prisma").profile;

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

const createProfile = async (req, res) => {
  try {
    var { userId } = req;
    console.log(userId);
  // console.log(userId);
    const userInfo = await User.findUnique({
      where: {
        id: userId,
      },
    })
  
    const { jobTitle, bio } = req.body;
    const profile = await Profile.create({
      data: {
        jobTitle,
        bio,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  
    res.status(201).send(profile);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};

module.exports = { getUserProfile ,createProfile};

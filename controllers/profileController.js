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
    const userInfo = await User.findUnique({
      where: {
        id: userId,
      },
    });

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

const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    const { jobTitle, bio } = req.body;

    const profile = await Profile.findUnique({
      where: {
        userId: userId,
      },
    });
    const updatedProfile = await Profile.update({
      where: {
        id: profile.id,
      },
      data: {
        jobTitle,
        bio,
      },
    });
    res.status(200).send(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = { getUserProfile, createProfile, updateProfile };

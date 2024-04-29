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
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({
        message: "User profile not found. Please check  and try again.",
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        "Failed to retrieve user profile due to a server error. Please try again later.",
    });
  }
};

const createProfile = async (req, res) => {
  try {
    var { userId } = req;
    const userInfo = await User.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userInfo) {
      res
        .status(404)
        .send({ message: "User not found. Unable to create profile." });
      return;
    }
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
    res.status(500).send({
      message:
        "Failed to create profile due to a server error. Please check your data and try again.",
    });
  }
};

const getOneProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const profile = await Profile.findUnique({
      where: {
        id: parseInt(profileId),
      },
    });
    if (profile) {
      res.send(profile);
    } else {
      res
        .status(404)
        .send({ message: "Profile not found.Please verify and try again" });
    }
  } catch (error) {
    res.status(500).send({
      message:
        "An unexpected error occurred while retrieving the profile. We are working to resolve the issue promptly.",
    });
  }
};

module.exports = { getUserProfile, createProfile, getOneProfile };

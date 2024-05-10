const User = require("../database/prisma").user;
const Profile = require("../database/prisma").profile;
const { upload } = require("../helper/helperFunction.js");

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findUnique({
      where: {
        id: userId,
      },
      include: {
        profile: {
          include: {
            skills: true,
          },
        },
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

    const { jobTitle, bio, officalDocument, cinRecto, cinVerso } = req.body;
console.log(req.body);
    // Upload documents
    const image = await upload(officalDocument);
    const image2 = await upload(cinRecto);
    const image3 = await upload(cinVerso);

    const profile = await Profile.create({
      data: {
        jobTitle,
        bio,
        officalDocument: image,
        cinRecto: image2,
        cinVerso: image3,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    res.status(201).send(profile);
    console.log(profile);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message:
        "Failed to create profile due to a server error. Please check your data and try again.",
    });
  }
};

const createProfileSkills = async (req, res) => {
  try {
    const { userId } = req;
    const { skills } = req.body;
    const response = await Profile.create({
      data: {
        clientId: userId,
        skills: {
          connect: skills.map((id) => ({ id })),
        },
      },
      include: {
        skills: true,
      },
    });
    // console.log(response);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOneProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findUnique({
      where: {
        id: parseInt(userId),
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
    console.log(error);
    res.status(500).send({
      message:
        "An unexpected error occurred while retrieving the profile. Please try again later.",
    });
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

module.exports = {
  getUserProfile,
  createProfile,
  updateProfile,
  getOneProfile,
  createProfileSkills,
};

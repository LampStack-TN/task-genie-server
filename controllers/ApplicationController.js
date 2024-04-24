const prisma = require("../database/prisma.js");

const applyToTask = async (req, res) => {
  const { userId, taskId } = req.body;
  console.log(req.body);

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  //   find the first Application hat matches the "taskId" and "userId".
  try {
    const existApp = await prisma.application.findFirst({
      where: {
        task: {
          id: taskId,
        },
        applicant: {
          id: userId,
        },
      },
    });

    if (existApp) {
      return res
        .status(409)
        .json({ message: "You have already applied to this task." });
    }

    const application = await prisma.application.create({
      data: {
        task: {
          connect: {
            id: taskId,
          },
        },
        applicant: {
          connect: {
            id: userId,
          },
        },
        status: "Pending",
      },
    });

    return res.status(201).json({ application });
  } catch (error) {
    console.log(error);
  }
};

const getAllApp = async (req, res) => {
  try {
    const tasks = await prisma.application.findMany();
    res.json(tasks);
  } catch (err) {
    console.log(err);
  }
};

const getUserApplications = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const applications = await prisma.application.findMany({
      where: {
        applicantId: parseInt(userId),
      },
      include: {
        task: true,
        applicant: true,
      },
    });

    if (applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this user." });
    }

    return res.status(200).json(applications);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  applyToTask,
  getAllApp,
  getUserApplications,
};

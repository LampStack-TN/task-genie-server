const prisma = require("../database/prisma.js");

const applyToTask = async (req, res) => {
  const { taskId } = req.body;
  const userId = req.userId;

  //   find the first Application hat matches the "taskId" and "userId".
  try {
    const existApp = await prisma.application.findFirst({
      where: {
        AND: [{ taskId: taskId }, { applicantId: userId }],
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
  const userId = req.userId;
 

  try {
    const applications = await prisma.application.findMany({
      where: {
        applicantId: userId,
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

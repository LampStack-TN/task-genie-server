const prisma = require("../database/prisma.js");

let TASKS = [];
const RemoveFromTasks = (taskId) => {
  TASKS = TASKS.filter((task) => task.id !== taskId);
};

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
    //removed
    RemoveFromTasks(taskId);

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

const getTaskApplications = async (req, res) => {
  const { taskId } = req.params;

  try {
    const applications = await prisma.application.findMany({
      where: { taskId: parseInt(taskId) },
      include: { applicant: true },
    });

    return res.json(applications);
  } catch (err) {
    console.error("Error fetching applications:", err);
  }
};

const acceptOrRejectApplication = async (req, res) => {
  const { applicationId, action } = req.body;
  const newStatus = action === "accept" ? "Accepted" : "Rejected";
  try {
    // check if the application exists and that the user has permission
    const application = await prisma.application.findUnique({
      where: { id: parseInt(applicationId) },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    const updatedApplication = await prisma.application.update({
      where: { id: parseInt(applicationId) },
      data: { status: newStatus },
    });

    console.log(updatedApplication);
    res.status(200).json(updatedApplication);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  applyToTask,
  getAllApp,
  getUserApplications,
  getTaskApplications,
  acceptOrRejectApplication,
};

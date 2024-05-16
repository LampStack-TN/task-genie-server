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
      include: { task: true },
    });

    const notification = await prisma.notification.create({
      data: {
        message: "Applied to your task",
        content: application.task.title,
        type: "Application",
        targetEntityId: taskId,
        userId: application.task.clientId,
        notifierId: userId,
      },
    });

    //removed

    return res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message:
        "An error occurred while applying to the task. Please try again.",
    });
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
        task: {
          include: {
            skills: true,
            client: true,
            applications: { where: { applicantId: userId } },
            _count: {
              select: {
                applications: { where: { applicantId: userId } },
                favouriteTasks: { where: { userId } },
              },
            },
          },
        },
        applicant: true,
      },
    });

    if (applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this user." });
    }

    applications.forEach(({ task }) => {
      task.liked = task._count.favouriteTasks > 0;
      task.applied = task._count.applications > 0;
    });
    return res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve user applications. Please try again later.",
    });
  }
};

const getTaskApplications = async (req, res) => {
  const { taskId } = req.params;

  try {
    const applications = await prisma.application.findMany({
      where: {
        taskId: parseInt(taskId),
        NOT: {
          status: "Rejected",
        },
      },
      include: { applicant: true },
    });

    return res.json(applications);
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve task applications. Please try again later.",
    });
  }
};

const changeApplicationStatus = async (req, res) => {
  const { applicationId, status } = req.body;

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
      data: { status },
      include: { applicant: { include: { profile: true } } },
    });
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({
      message:
        "An error occurred while processing the application. Please try again.",
    });
  }
};

const cancelApplication = async (req, res) => {
  const { id } = req.params;

  try {
    // check if the application exists and that the user has permission
    const response = await prisma.application.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message:
        "An error occurred while processing the application. Please try again.",
    });
  }
};

module.exports = {
  applyToTask,
  getAllApp,
  getUserApplications,
  getTaskApplications,
  changeApplicationStatus,
  cancelApplication,
};

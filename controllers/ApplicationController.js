const prisma = require("../database/prisma.js");

const applyToTask = async (req, res) => {
  const { userId, taskId, price } = req.body;
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
        price: price,
      },
    });

    return res.status(201).json({ application });
  } catch (error) {
    console.log(error);
  }
};

const getAllApp = async (req, res) => {
    try {
      const tasks=await prisma.application.findMany()
      res.json(tasks)
    } catch (err) {
      console.log(err);
    }
  };

module.exports = {
  applyToTask,getAllApp
};

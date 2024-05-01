const prisma = require("../database/prisma.js");

const createHiring = async (req, res) => {
  const { serviceId, price } = req.body;
  const clientId = req.userId;

  try {
    // checking existence of client and service
    const serviceExists = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    const clientExists = await prisma.user.findUnique({
      where: { id: clientId },
    });

    if (!serviceExists || !clientExists) {
      return res.status(404).json({ message: "Service or client not found." });
    }

    const existingHiring = await prisma.hiring.findFirst({
      where: {
        clientId: clientId,
        serviceId: serviceId,
        status: { notIn: ["Rejected"] },
      },
    });

    if (existingHiring) {
      return res
        .status(409)
        .json({
          message: "An active hiring request already exists for this service.",
        });
    }

    const hiring = await prisma.hiring.create({
      data: {
        clientId: clientId,
        serviceId: serviceId,
        price: price,
        status: "Pending",
      },
    });

    return res.status(201).json(hiring);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create hiring request. Please try again." });
  }
};

module.exports = { createHiring };

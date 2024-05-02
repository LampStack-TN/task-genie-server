const prisma = require("../database/prisma.js");

const createHiring = async (req, res) => {
  const { serviceId, price } = req.body;
  const clientId = req.userId;
  // checking existence of service and status of service
  try {
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service || service.status === "hired") {
      return res
        .status(404)
        .json({ message: "Service not available or already hired." });
    }

    const hiring = await prisma.hiring.create({
      data: {
        clientId,
        serviceId,
        price,
        status: "Pending",
      },
    });

    await prisma.service.update({
      where: { id: serviceId },
      data: { status: "hired" },
    });

    res.status(201).json(hiring);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create hiring request. Please try again." });
  }
};

module.exports = { createHiring };

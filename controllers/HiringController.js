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

const getMyHirings = async (req, res) => {
  try {
    const userId = req.userId;
    const hirings = await prisma.hiring.findMany({
      where: {
        service: {
          professionalId: userId,
        },
      },
      include: {
        service: {
          include: {
            professional: true,
            skills: true,
          },
        },
        client: true,
      },
    });

    if (hirings.length === 0) {
      return res.status(404).json({ message: "No hirings found for you." });
    }

    res.status(200).json(hirings);
  } catch (error) {
    console.error("Error fetching hirings for user:", error);
    res.status(500).json({
      message:
        "Unable to retrieve your hirings at this time. Please try again later.",
    });
  }
};

module.exports = { createHiring, getMyHirings };

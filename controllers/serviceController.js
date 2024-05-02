const Service = require("../database/prisma").service;

const CreateService = async (req, res) => {
  try {
    const { userId } = req;
    const { title, description, price, availability, location, skills } =
      req.body;
    console.log(userId);
    const response = await Service.create({
      data: {
        professionalId: userId,
        title,
        description,
        price,
        availability,
        location,
        skills: {
          connect: skills.map((id) => ({ id })),
        },
      },

      include: {
        skills: true,
      },
    });
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const getAll = async (req, res) => {
  try {
    const services = await Service.findMany({
      include: {
        skills: true,
        professional: true,
      },
    });
    res.json(services);
  } catch (err) {
    res.status(500).send({
      message:
        "Unable to retrieve services at this time. Please try again later.",
    });
  }
};


const getOneService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findUnique({
      where: { id: parseInt(id) },
      include: {
        skills: true,
        professional: true,
      },
    });
    if (!service) {
      res
        .status(404)
        .send({ message: "Service not found. Verify and try again." });
    } else {
      res.send(service);
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving service  details. Please try again later.",
    });
  }
};

const getMyServices = async (req, res) => {
  try {
    const { userId } = req;
    console.log(userId);
    const services = await Service.findMany({
      where: {
        professionalId: userId,
      },
    });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).send({
      message:
        "Unable to retrieve your services at this time. Please try again later.",
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Service.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (err) {
    res.status(404).send({ message: "Unable to delete service. Service not found." });
  }
};
module.exports = {
  CreateService,
  getAll,
  getOneService,
  getMyServices,
  deleteService
};

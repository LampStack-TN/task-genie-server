const Service = require("../database/prisma").service;

const CreateService = async (req, res) => {
  try {
    const { userId } = req;
    const { title, description, price, availability, location } = req.body;
    console.log(userId);
    const response = await Service.create({
      data: {
        professionalId: userId,
        title,
        description,
        price,
        availability,
        location,
      },
      // skills: {
      //   connect: skills.map((id) => ({ id })),
      // },

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



module.exports = {
  CreateService,
  getAll,
};

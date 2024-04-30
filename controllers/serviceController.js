const Service = require("../database/prisma").service;
const CreateService = async (req, res) => {
  try {
    const { userId } = req;
    const { title, description, price, avaiblity, location, skills } = req.body;
    const resposne = await Service.create({
      data: {
        clientId: userId,
        title,
        description,
        price,
        avaiblity,
        location,

        skills: {
          connect: skills.map((id) => ({ id })),
        },
      },
      include:{
        skills:true
      }
    });
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
};

module.exports ={
    CreateService
}
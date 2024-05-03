// Import necessary models
const User = require("../database/prisma").user;
const Rating = require("../database/prisma").Rating;
const createRating = async (req, res) => {
  try {
    const { clientId, professionalId, rate } = req.body;

    // check if one of them client or professional exist
    const client = await User.findUnique({ where: { id: 10001 } });
    const professional = await User.findUnique({ where: { id: 10007 } });
console.log("client :",client)
console.log('professional :',professional)
    if (!client || !professional) {
      return res.status(404).json({ error: "Client or Professional not found" });
    }

    // Create a new rating
    const createdRating = await Rating.create({
      data: {
        clientId,
        professionalId,
        rate
      }
    });

    // send createdRating in res
    res.status(201).json({ message: "Rating created successfully", rating: createdRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createRating };

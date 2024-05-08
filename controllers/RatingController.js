// Import necessary models
const User = require("../database/prisma").user;
const Rating = require("../database/prisma").Rating;
const createRating = async (req, res) => {
  try {
    const { clientId, professionalId, rate } = req.body;

    // check if one of them client or professional exist
    const client = await User.findUnique({ where: { id: clientId } });
    const professional = await User.findUnique({ where: { id: professionalId } });
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


const getRating = async (req, res) => {
  try {
    const { clientId, professionalId } = req.body;

    const clientAverageRating = await Rating.aggregate({
      _avg: {
        rate: true,
      },
      where: {
        clientId: clientId,
      },
    })
    
    const professionalAverageRating = await Rating.aggregate({
      _avg: {
        rate: true,
      },
      where: {
        professionalId: professionalId,
      },
    });

    res.status(200).json({
      clientAverageRating: Math.round(clientAverageRating._avg.rate)  ,
      professionalAverageRating: Math.round(professionalAverageRating._avg.rate),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { createRating , getRating };

// Import necessary models
const {User,Rating} = require("../database/prisma")

const createRating = async (req, res) => {
  try {
    const { clientId, professionalId, rate } = req.body;

    // check if one of them client or professional exist
    const client = await User.findUnique({ where: { id: clientId } });
    const professional = await User.findUnique({ where: { id: professionalId } });
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
console.log('createdRating :',createdRating)
const clientRatings = await Rating.findMany({ where: { clientId } });
    const professionalRatings = await Rating.findMany({ where: { professionalId } });

// console.log("clientRatings : ",clientRatings);
// console.log("professionalRatings : ",professionalRatings);



const clientTotalRating = clientRatings.reduce((total, rating) => total + rating.rate, 0);
// console.log("clientTotalRating :",clientTotalRating);
    const clientRatingCount = clientRatings.length;


    const clientPercentage =Math.floor((((clientTotalRating / (clientRatingCount * 5)) * 100)*5)/100)
    console.log("clientPercentage :",clientPercentage);

    
    const professionalTotalRating = professionalRatings.reduce((total, rating) => total + rating.rate, 0);
    // console.log("professionalTotalRating :",professionalTotalRating);
    const professionalRatingCount = professionalRatings.length;


    const professionalPercentage = Math.floor((((professionalTotalRating / (professionalRatingCount * 5)) * 100)*5)/100)
    console.log("professionalPercentage :",professionalPercentage);
    
    // send createdRating in res
    res.status(201).json({ message: "Rating created successfully", rating: createdRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createRating };

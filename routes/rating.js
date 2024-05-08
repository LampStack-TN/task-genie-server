const router = require("express").Router();

const{createRating, getRating}=require("../controllers/RatingController.js")
const verifyToken = require("../middlewares/verifyToken.js");

router.post('/rate', verifyToken, createRating);
router.get('/getRate',verifyToken,getRating)

module.exports = router;

const router = require("express").Router();

const{createRating}=require("../controllers/RatingController.js")
const verifyToken = require("../middlewares/verifyToken.js");

router.post('/rate', verifyToken, createRating);


module.exports = router;

const router = require("express").Router();

const{createHiring}=require("../controllers/HiringController.js")
const verifyToken = require("../middlewares/verifyToken.js");

router.post('/hiring', verifyToken, createHiring);


module.exports = router;

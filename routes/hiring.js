const router = require("express").Router();

const {
  createHiring,
  getMyHirings,
} = require("../controllers/HiringController.js");
const verifyToken = require("../middlewares/verifyToken.js");

router.post("/hiring", verifyToken, createHiring);
router.get("/myhirings", verifyToken, getMyHirings);
module.exports = router;

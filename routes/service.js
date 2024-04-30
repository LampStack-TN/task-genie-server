const router = require("express").Router();
const serviceController = require("../controllers/serviceController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/createService", verifyToken, serviceController.CreateService);

module.exports = router;

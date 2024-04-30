const router = require("express").Router();
const serviceController = require("../controllers/serviceController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/createService", verifyToken, serviceController.CreateService);
router.get("/getAllServices", verifyToken, serviceController.getAll);

module.exports = router;

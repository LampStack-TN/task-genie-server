const router = require("express").Router();

const {
  applyToTask,
  getAllApp,
  getUserApplications,
  changeApplicationStatus,
  getTaskApplications,
} = require("../controllers/ApplicationController.js");
const verifyToken = require("../middlewares/verifyToken.js");

router.post("/apply", verifyToken, applyToTask);
router.get("/getAllApp", getAllApp);
router.get("/", verifyToken, getUserApplications);
router.get("/:taskId/applications", verifyToken, getTaskApplications);
router.post("/application/respond", verifyToken, changeApplicationStatus);
module.exports = router;

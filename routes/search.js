const router = require("express").Router();
const taskController = require("../controllers/searchTaskController");
const verifyToken = require("../middlewares/verifyToken");
router.get("/search", verifyToken, taskController.searchTasks);
module.exports = router;
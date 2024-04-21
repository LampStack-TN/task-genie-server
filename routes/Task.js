const router = require("express").Router();
const taskController = require("../controllers/TaskContoller");

router.post("/task", taskController.CreateTask);

module.exports = router;

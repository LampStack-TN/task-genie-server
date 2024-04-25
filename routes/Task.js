const router = require("express").Router();
const taskController = require("../controllers/TaskContoller");
const verifyToken = require("../middlewares/verifyToken.js");

router.post("/add", taskController.CreateTask);
router.get("/getAll", taskController.getAll);
router.get("/getOne/:id", taskController.getOne);
router.delete("/delete/:id", taskController.deleteTask);
router.put("/update/:id", taskController.updateTask);
router.get("/myTasks", verifyToken, taskController.getMyTasks);
module.exports = router;

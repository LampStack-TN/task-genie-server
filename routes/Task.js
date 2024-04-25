const router = require("express").Router();
const taskController = require("../controllers/TaskContoller");

const verifyToken = require("../middlewares/verifyToken");

router.post("/add", verifyToken, taskController.CreateTask);
router.get("/getAll", verifyToken, taskController.getAll);
router.get("/getOne/:id", verifyToken, taskController.getOne);
router.delete("/delete/:id", verifyToken, taskController.deleteTask);
router.put("/update/:id", verifyToken, taskController.updateTask);
router.get("/myTasks", verifyToken, taskController.getMyTasks);

module.exports = router;

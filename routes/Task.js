const router = require("express").Router();
const taskController = require("../controllers/TaskContoller");

const verifyToken = require("../middlewares/verifyToken");

router.get("/my-tasks", verifyToken, taskController.getMyTasks);
router.post("/add", verifyToken, taskController.CreateTask);
router.get("/getAll", verifyToken, taskController.getAll);
router.get("/:id", verifyToken, taskController.getOne);
router.get("/client/:id", verifyToken, taskController.getOneClient);
router.delete("/delete/:id", verifyToken, taskController.deleteTask);
router.put("/update/:id", verifyToken, taskController.updateTask);

module.exports = router;

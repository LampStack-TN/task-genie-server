const router = require("express").Router();
const taskController = require("../controllers/TaskContoller");

router.post("/add", taskController.CreateTask);
router.get("/getAll",taskController.getAll)
router.get("/getOne/:id",taskController.getOne)
router.delete("delete/:id",taskController.deleteTask)
router.put("/update/:id",taskController.updateTask)
module.exports = router;

const router = require("express").Router();
const taskController = require("../controllers/TaskContoller");

router.post("/add", taskController.CreateTask);
router.get("/getAll",taskController.getAll)
router.get("/getOne/:id",taskController.getOne)
module.exports = router;

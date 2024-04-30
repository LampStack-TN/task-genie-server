const router = require("express").Router();

const {
  likeTask,
  getFavoriteTasks,
} = require("../controllers/FavouriteTaskController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/likeTask", verifyToken, likeTask);
router.get("/favoriteTasks", verifyToken, getFavoriteTasks);
module.exports = router;

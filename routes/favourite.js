const router = require("express").Router();

const {
  likeTask,
  getFavoriteTasks,
  unlikeTask,
} = require("../controllers/FavouriteTaskController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/likeTask", verifyToken, likeTask);
router.get("/favoriteTasks", verifyToken, getFavoriteTasks);
router.post("/unlikeTask", verifyToken, unlikeTask);
module.exports = router;

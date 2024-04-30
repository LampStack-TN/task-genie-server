const router = require("express").Router();

const {
  toggleLikeTask,
  getFavoriteTasks,
} = require("../controllers/FavouriteTaskController");
const verifyToken = require("../middlewares/verifyToken");
router.post("/likeTask", verifyToken, toggleLikeTask);
router.get("/favoriteTasks", verifyToken, getFavoriteTasks);
module.exports = router;

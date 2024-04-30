const router = require("express").Router();

const { likeTask } = require("../controllers/FavouriteTaskController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/likeTask", verifyToken, likeTask);

module.exports = router;

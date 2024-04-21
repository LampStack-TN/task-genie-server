const router = require("express").Router();

router.post("/register", (req, res) => {
  res.send("you have reached registration route");
});

module.exports = router;

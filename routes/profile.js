const router = require("express").Router();
const profileController=require("../controllers/Profile")

router.get("/getProfile",profileController.getUserProfile)

module.exports = router;
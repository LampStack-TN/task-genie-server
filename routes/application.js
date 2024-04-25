const router = require("express").Router();

const { applyToTask,getAllApp,getUserApplications} = require('../controllers/ApplicationController.js'); 
const verifyToken=require('../middlewares/verifyToken.js')

router.post('/apply',verifyToken, applyToTask);
router.get("/getAllApp",getAllApp)
router.get("/app/:userId",getUserApplications)
module.exports = router;

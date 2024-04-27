const router = require("express").Router();

const { applyToTask,getAllApp,getUserApplications,getTaskApplications} = require('../controllers/ApplicationController.js'); 
const verifyToken=require('../middlewares/verifyToken.js')

router.post('/apply',verifyToken, applyToTask);
router.get("/getAllApp",getAllApp)
router.get("/app/",verifyToken,getUserApplications)
router.get('/:taskId/applications', verifyToken,getTaskApplications);
module.exports = router;

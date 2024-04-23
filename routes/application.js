const router = require("express").Router();

const { applyToTask,getAllApp,getUserApplications} = require('../controllers/ApplicationController.js'); 

router.post('/apply', applyToTask);
router.get("/getAllApp",getAllApp)
router.get("/app/:id",getUserApplications)
module.exports = router;

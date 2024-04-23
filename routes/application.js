const router = require("express").Router();

const { applyToTask,getAllApp} = require('../controllers/ApplicationController.js'); 

router.post('/apply', applyToTask);
router.get("/getAllApp",getAllApp)
module.exports = router;

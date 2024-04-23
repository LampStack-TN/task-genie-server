const router = require("express").Router();

const { applyToTask} = require('../controllers/ApplicationController.js'); 

router.post('/apply', applyToTask);

module.exports = router;

const router = require("express").Router();

const {signin}=require('../../controllers/AdminController')

router.post('/signin',signin)



module.exports = router;

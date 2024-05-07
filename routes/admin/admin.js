const router = require("express").Router();

const {signin,getAllClients}=require('../../controllers/AdminController')

router.post('/signin',signin)
router.get("/clients",getAllClients)


module.exports = router;

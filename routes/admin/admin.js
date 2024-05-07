const router = require("express").Router();

const {signin,getAllClients,getAllProfessionals}=require('../../controllers/AdminController')

router.post('/signin',signin)
router.get("/clients",getAllClients)
router.get('/professionals',getAllProfessionals)


module.exports = router;

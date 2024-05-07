const router = require("express").Router();

const {signin,getAllClients,getAllProfessionals,countProfessionals}=require('../../controllers/AdminController')

router.post('/signin',signin)
router.get("/clients",getAllClients)
router.get('/professionals',getAllProfessionals)
router.get("/countProfessionals",countProfessionals)


module.exports = router;

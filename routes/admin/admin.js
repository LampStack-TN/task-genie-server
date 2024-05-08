const router = require("express").Router();

const {signin,getAllClients,getAllProfessionals,countProfessionals,countClients,getAllTasks}=require('../../controllers/AdminController')

router.post('/signin',signin)


router.get("/clients",getAllClients)
router.get('/professionals',getAllProfessionals)
router.get("/countProfessionals",countProfessionals)
router.get("/countClients",countClients)
router.get('/AllTasks',getAllTasks)

module.exports = router;

const router = require("express").Router();

const {signin,getAllClients,getAllProfessionals,countProfessionals,countClients,getAllTasks}=require('../../controllers/AdminController')
const verifyToken = require("../../middlewares/verifyToken.js")
router.post('/signin'/* ,verifyToken */,signin)
router.get("/clients"/* ,verifyToken */,getAllClients)
router.get('/professionals'/* ,verifyToken */,getAllProfessionals)
router.get("/countProfessionals"/* ,verifyToken */,countProfessionals)
router.get("/countClients"/* ,verifyToken */,countClients)
router.get("/AllTasks",getAllTasks)

module.exports = router;

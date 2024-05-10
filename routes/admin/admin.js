const router = require("express").Router();

const {signin,getAllClients,getAllProfessionals,countProfessionals,countClients,getAllTasks,getAdmin,updateUserPasswordAndEmail ,updateAdminAvatar}=require('../../controllers/AdminController')
const verifyToken = require("../../middlewares/verifyToken.js")
router.post('/signin' ,signin)
router.get("/clients" ,verifyToken,getAllClients)
router.get('/professionals',verifyToken ,getAllProfessionals)
router.get("/countProfessionals" ,verifyToken,countProfessionals)
router.get("/countClients" ,verifyToken ,countClients)
router.get("/AllTasks",verifyToken ,getAllTasks)
router.get("/getAdmin",verifyToken ,getAdmin)
router.put("/update/:id",verifyToken ,updateUserPasswordAndEmail)
router.put("/updateAvatar/:id",verifyToken ,updateAdminAvatar)


module.exports = router;

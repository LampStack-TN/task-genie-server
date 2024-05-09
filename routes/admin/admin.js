const router = require("express").Router();

const {
  signin,
  getAllClients,
  getAllProfessionals,
  countProfessionals,
  countClients,
  getAllTasks,
  getAdmin,
  updateAdmin,
  getAllServices,
} = require("../../controllers/AdminController");
const verifyToken = require("../../middlewares/verifyToken.js");
router.post("/signin", signin);
router.get("/clients" ,verifyToken, getAllClients);
router.get("/professionals" ,verifyToken, getAllProfessionals);
router.get("/countProfessionals"  ,verifyToken, countProfessionals);
router.get("/countClients" ,verifyToken , countClients);
router.get("/AllTasks" ,verifyToken , getAllTasks);
router.get("/getAdmin" /*,verifyToken */, getAdmin);
router.put("/update/:id" /*,verifyToken */, updateAdmin);
router.get("/services", verifyToken,getAllServices);
module.exports = router;

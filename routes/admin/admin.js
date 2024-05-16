const router = require("express").Router();

const {
  signin,
  getAllClients,
  getAllProfessionals,
  countProfessionals,
  countClients,
  getAllTasks,
  getTaskById,
  getAdmin,
  updateAdmin,
  getAllServices,
  getServiceById,
  updateUserPasswordAndEmail,
  updateAdminAvatar,
  getProfessionalById,
  verifyUser,
  rejectUser,getAllVerifiedProfessionals
} = require("../../controllers/AdminController");
const verifyToken = require("../../middlewares/verifyToken.js");
router.post("/signin", signin);
router.get("/clients", verifyToken, getAllClients);
router.get("/professionals", verifyToken, getAllProfessionals);
router.get("/countProfessionals", verifyToken, countProfessionals);
router.get("/countClients", verifyToken, countClients);
router.get("/AllTasks", verifyToken, getAllTasks);
router.get("/getAdmin", verifyToken, getAdmin);
router.put("/update/:id", verifyToken, updateAdmin);
router.get("/services", verifyToken, getAllServices);
router.get("/tasks/:id", verifyToken, getTaskById);
router.get("/services/:id", verifyToken, getServiceById);
router.put("/update/:id", verifyToken, updateUserPasswordAndEmail);
router.put("/updateAvatar/:id", verifyToken, updateAdminAvatar);
router.get("/professionals/:id", verifyToken, getProfessionalById);
router.put("/users/:id/verify", verifyToken, verifyUser);
router.put("/users/:id/reject", verifyToken, rejectUser);
router.get("/verified", verifyToken, getAllVerifiedProfessionals)

module.exports = router;

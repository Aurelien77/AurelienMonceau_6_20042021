const express = require("express"); //constante qui appelle le firmware node "Express"
const router = express.Router(); // constante qui appelle la fonction Router de "Express"
const dotenv = require("dotenv").config();
const auth = require("../middleware/auth"); // securité ?
const multer = require("../middleware/multer-config"); //envoi de fichier
const sauceCtrl = require("../controllers/sauce");
//router remplace app
router.post("/", auth, multer, sauceCtrl.createSauce); //endpoint
router.post("/:id/like", auth, sauceCtrl.addLike);
router.get("/", auth, sauceCtrl.getAllSauces); //endpoint
router.get("/:id", auth, sauceCtrl.getOneSauce); //endpoint
router.put("/:id", auth, multer, sauceCtrl.modifySauce); //endpoint
router.delete("/:id", auth, sauceCtrl.deleteSauce); //endpoint

module.exports = router;

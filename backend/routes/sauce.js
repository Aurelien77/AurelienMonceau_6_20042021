const express = require("express"); //constante qui appelle le firmware node "Express"
const router = express.Router(); // constante qui appelle la fonction Router de "Express"

const auth = require("../middleware/auth"); // securité ?
const multer = require("../middleware/multer-config"); //envoi de fichier
const sauceCtrl = require("../controllers/sauce");
router.post("/", auth, multer, sauceCtrl.createSauce); //endpoint
router.post("/:id/like", auth, sauceCtrl.addLike);
router.get("/", auth, sauceCtrl.getAllSauces); //endpoint
router.get("/:id", auth, sauceCtrl.getOneSauce); //endpoint
router.put("/:id", auth, multer, sauceCtrl.modifySauce); //endpoint
router.delete("/:id", auth, sauceCtrl.deleteSauce); //endpoint

module.exports = router;

/* const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');
router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllStuff);





module.exports = router; */

const express = require("express"); //constante qui appelle le firmware node "Express"
const router = express.Router(); // constante qui appelle la fonction Router de "Express"

const userCtrl = require("../controllers/user"); // require controller uSer

router.post("/signup", userCtrl.signup); // Post avec signup/ ce qui se trouve dans /controllers/user   exports.signup  ( S'inscrire avec mdp + bcrypt +  hash )
router.post("/login", userCtrl.login); // Post avec /login  ce qui se trouve dans  /controllers/user   exports.login   ( Se connecter + bcrypt  )

module.exports = router; //Le module est exporté

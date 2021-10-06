const express = require("express"); //constante qui appelle le firmware node "Express"
const bodyParser = require("body-parser"); //constante qui appelle Bodyparser / paquet npm Node
const mongoose = require("mongoose"); //constante firmware mongoose / Mango DB
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const path = require("path"); //Pour le server de fichier    / express.path
const helmet = require("helmet");
const app = express(); //express
mongoose

  .connect(process.env.SECRET_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB reussie !"))
  .catch(() => console.log("Connexion à MongoDB echouee !")); // Connexion à MangoDB

app.use((req, res, next) => {
  // toutes les connexions de l'application express
  // + Contrôle de sécurité autorisant les connexions
  res.setHeader("Access-Control-Allow-Origin", "*"); //est empaqueté dans le Header du proto HTTP les paramètres de sécurités
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next(); //passe à une nouvelle fonction
});

app.use(bodyParser.json()); // Toutes les connexions utilisent bodyParser

app.use("/images", helmet(), express.static(path.join(__dirname, "images"))); // Toutes les connexions qui utilise la route image  / server de fichiers
app.use("/api/sauces", helmet(), sauceRoutes); // Toutes les connexions qui utilisent /api/sauces require ("./routes/sauce");
app.use("/api/auth", helmet(), userRoutes); // Toutes les connexions qui utilisent /api/auth require ("./routes/user");

module.exports = app; //Le module exporté est le module app  / + paramètres

const express = require("express"); //constante qui appelle le firmware node "Express"
const bodyParser = require("body-parser"); //constante qui appelle Bodyparser / paquet npm Node
const mongoose = require("mongoose"); //constante firmware mongoose / Mango DB
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const path = require("path"); //Pour le server de fichier    / express.path

const app = express(); //express
mongoose

  .connect(
    /*  "mongodb+srv://Aurelien:Bateau01@cluster0.cjsqv.mongodb.net/Openclassroom?retryWrites=true&w=majority", */
    "mongodb+srv://Aurelien:Bateau01@cluster0.4ig74.mongodb.net/Openclassroom?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB reussie !"))
  .catch(() => console.log("Connexion à MongoDB echouee !")); // Connexion à MangoDB

app.use((req, res, next) => {
  // toutes les connexions de l'application express / const app
  //Contrôle de sécurité autorisant les connexions
  res.setHeader("Access-Control-Allow-Origin", "*");
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

app.use(bodyParser.json()); // Toutes les connexions utilise bodyParser

app.use("/images", express.static(path.join(__dirname, "images"))); // Toutes les connexions utilisent express.static + le chemin définit / server de fichier
app.use("/api/sauces", sauceRoutes); // Toutes les connexions qui utilisent /api/sauces require ("./routes/sauce");
app.use("/api/auth", userRoutes); // Toutes les connexions qui utilisent /api/auth require ("./routes/user");

module.exports = app; //Le module exporté est le module app  / + paramêtres

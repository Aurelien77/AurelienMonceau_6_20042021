const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const path = require("path");

const app = express();
mongoose

  .connect(
    /*  "mongodb+srv://Aurelien:Bateau01@cluster0.cjsqv.mongodb.net/Openclassroom?retryWrites=true&w=majority", */
    "mongodb+srv://Aurelien:Bateau01@cluster0.4ig74.mongodb.net/Openclassroom?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB reussie !"))
  .catch(() => console.log("Connexion à MongoDB echouee !"));

app.use((req, res, next) => {
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
  next();
});

app.use(bodyParser.json()); // bodyParser est utilisé par tous les endpoints ?

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes); // Constante
app.use("/api/auth", userRoutes);

module.exports = app;

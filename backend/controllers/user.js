const bcrypt = require("bcrypt"); //cryptage MDP
const User = require("../models/User"); //Modèle pour communiquer avec la DB
const jwt = require("jsonwebtoken"); //securité token *
exports.signup = (req, res, next) => {
  //fonction
  bcrypt
    .hash(req.body.password, 10) //requête envoyé dans le body grâce à bodyparser du mdp
    .then((hash) => {
      const user = new User({
        //new User = shéma définit pour envoi des données vers la BD
        //transite de façon hashé
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.login = (req, res, next) => {
  //requête envoyé dans le body grâce à bodyparser
  User.findOne({ email: req.body.email }) //si il ne trouve pas affiche un message ou bien s'y il trouve il renvoie un token de connexion qui dur 24h / token généré par le framwork express +  const JWT *
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

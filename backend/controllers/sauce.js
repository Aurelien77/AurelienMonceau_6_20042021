const Sauce = require("../models/Sauce");

const fs = require("fs"); // ???

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); // ce qui à été posté
  delete sauceObject._id;
  const sauce = new Sauce({
    //l'on se base sur le modèle
    ...sauceObject, // trois points ?
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      // les images
      req.file.filename
    }`,
    likes: 0, // une ligne like à 0
    dislikes: 0, // une ligne dislike à 0
    usersLiked: [], // un tableau usersLiked vide
    usersDisliked: [], // un tableau usersDisLiked vide
  });
  console.log(req.body);
  sauce
    .save()
    .then(() =>
      res.status(201).json({ message: " Votre sauce a bien été ajoutée !" })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

exports.modifySauce = (req, res, next) => {
  const sauce = new Sauce({
    //l'on se base sur le modèle
    ...req.body,
  });
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //il cherche dans la base de donnée la sauce qui à cet ID pour mettre à jours
    .then(() =>
      res.status(201).json({ message: " Votre sauce à été modifiée !" })
    )
    .catch((error) => res.status((400).json({ error })));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //l'on se base sur le modèle
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/image/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() =>
            res
              .status(201)
              .json({ message: " Votre sauce a bien été supprimée !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) //l'on se base sur le modèle
    .then((Sauce) => res.status(201).json(Sauce))
    .catch((error) => res.status(404).json({ error }));
};
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.addLike = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      switch (req.body.like) {
        case 1: //swith permet de définir des cas
          if (!sauce.usersLiked.includes(req.body.userId)) {
            //Si l'utilisateur n'est pas présent dans le tableau usersLiked
            //ajouterlike 1, push userId dans le tableau des usersLiked //
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() => res.status(210).json({ message: "j'aime" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case -1: //l'utilisateur disliked la sauce
          if (!sauce.usersDisliked.includes(req.body.userId)) {
            //si user id ne se trouve pas dans le tableau usersDisliked
            // ajouter 1, puis push userId dans le tableau usersDisliked //
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() => res.status(210).json({ message: "Je n'aime pas" }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        case 0: //Retirer like et dislike
          if (sauce.usersLiked.includes(req.body.userId)) {
            //Si userID est présent dans le tableau usersLiked
            // likes -1 , retirer userId du tableau //
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() => res.status(201).json({ message: " " }))
              .catch((error) => res.status(400).json({ error }));
          } else if (sauce.usersDisliked.includes(req.body.userId)) {
            //si l'id de l'utilisateur se trouve dans usersdisliked
            /*Retire le dislike et l'user id du tableau usersDisliked */
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId },
                _id: req.params.id,
              }
            )
              .then(() => res.status(201).json({ message: " " }))
              .catch((error) => res.status(400).json({ error }));
          }
          break;
        default:
          throw {
            error:
              " Le serveur a rencontré un problème, veuillez réessayer plus tard !",
          };
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

/* 
const Thing = require('../models/thing');
const fs = require('fs');
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({
      ...thingObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`à été 
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };


exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?
      {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };
  


  exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => {
        const filename = thing.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };
exports.getAllStuff = (req, res, next) => {
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}; */

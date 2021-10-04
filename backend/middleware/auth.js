const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // recupere le token dans l'entêtte
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // il décrype le token
    const userId = decodedToken.userId; // il recupère l'id qui est dans le token
    if (req.body.userId && req.body.userId !== userId) {
      // test si le user id est différent de ce qui se trouve dans le token.
      throw "Invalid user ID";
    } else {
      next(); // tout ces bien passé
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
}; //puis par dans le controler concerné

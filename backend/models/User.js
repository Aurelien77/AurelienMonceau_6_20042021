const mongoose = require("mongoose"); //framwork de MangoDB
const uniqueValidator = require("mongoose-unique-validator"); // fonction mongoose ?

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // fonction mongoose ?

module.exports = mongoose.model("Users", userSchema); //export du modèle

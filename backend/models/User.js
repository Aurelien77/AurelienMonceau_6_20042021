const mongoose = require("mongoose"); //framwork de MangoDB
const uniqueValidator = require("mongoose-unique-validator"); // package mangoose unique validator

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, //unique:true protège des doublons
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); //package qui simplifie la tâche pour protéger des doublons

module.exports = mongoose.model("Users", userSchema); //export du modèle

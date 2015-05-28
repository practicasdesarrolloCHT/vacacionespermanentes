var mongoose = require('mongoose');

var CiudadSchema = new mongoose.Schema({
  nombre: String,
  cantidadDeDias: Number,
  latitude: Number,
  longitude: Number,
  message: String
});


mongoose.model('Ciudad', CiudadSchema);
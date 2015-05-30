var mongoose = require('mongoose');

var CiudadSchema = new mongoose.Schema({
  nombre: String,
  cantidadDeDias: Number,
  latitude: Number,
  longitude: Number,
  message: String,
  pais: String,
  puntosDeInteres: [{nombre: String,
  					 direccion: String,
  					 latitude: Number,
  					 longitude: Number}],
  hotel: {reference: String}
});


mongoose.model('Ciudad', CiudadSchema);
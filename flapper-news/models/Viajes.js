

var mongoose = require('mongoose');

var ViajeSchema = new mongoose.Schema({
  nombre: String,
  usuario: String,
  fecha_inicio: Date,
  fecha_fin: Date,
  ciudades: [{id:String, nombre: String, latitude: String, longitude: String, message: String, city_short_name: String}]
});


mongoose.model('Viaje', ViajeSchema);
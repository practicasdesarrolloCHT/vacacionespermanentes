

var mongoose = require('mongoose');

var ViajeSchema = new mongoose.Schema({
  nombre: String,
  usuario: String,
  fecha_inicio: Date,
  fecha_fin: Date,
  ciudades: [String]
});


mongoose.model('Viaje', ViajeSchema);
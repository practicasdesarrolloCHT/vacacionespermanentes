

var mongoose = require('mongoose');

var ViajeSchema = new mongoose.Schema({
  nombre: String,
  fecha_inicio: String, //Date,
  fecha_fin: String//Date
  destino: String
});



mongoose.model('Viaje', ViajeSchema);
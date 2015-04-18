

var mongoose = require('mongoose');

var ViajeSchema = new mongoose.Schema({
  nombre: String,
  fecha_inicio: Date,
  fecha_fin: Date,
  destino: String
});


mongoose.model('Viaje', ViajeSchema);
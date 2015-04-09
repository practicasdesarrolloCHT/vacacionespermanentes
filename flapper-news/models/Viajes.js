var mongoose = require('mongoose');

var ViajeSchema = new mongoose.Schema({
  nombre: String,
  fechas: [Date]
});



mongoose.model('Viaje', ViajeSchema);
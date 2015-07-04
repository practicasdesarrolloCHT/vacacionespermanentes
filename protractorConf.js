// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [ 'integralTests/loggingTest.js',
           'integralTests/ciudadDetalleTest.js', 
            'integralTests/detalleViajeTest.js',
            'integralTests/persistenciaTest.js']
   //specs: [ 'integralTests/persistenciaTest.js']**/
}
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
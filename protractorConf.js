// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  jasmineNodeOpts: {defaultTimeoutInterval: 50000},
  specs: [ //'integralTests/loggingTest.js']//,
           //'integralTests/ciudadDetalleTest.js']//, 'integralTests/detalleViajeTest.js']
           'test/integralTest.js']
}
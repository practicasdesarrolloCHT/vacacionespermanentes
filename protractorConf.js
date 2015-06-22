// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  jasmineNodeOpts: {defaultTimeoutInterval: 50000},
  specs: ['test/integralTest.js']
}
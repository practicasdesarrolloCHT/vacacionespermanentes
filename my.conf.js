// Karma configuration
// Generated on Wed Jun 10 2015 17:05:20 GMT-0300 (Hora estándar de Argentina)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      "http://maps.googleapis.com/maps/api/js?sensor=false&language=en",
      'public/javascripts/lib/angular/angular.js',
      'public/javascripts/lib/angular-ui-router/release/angular-ui-router.js',
      'public/javascripts/lib/angular-mocks/angular-mocks.js',
      'public/javascripts/lib/angular-sanitize/angular-sanitize.js',
      'public/javascripts/lib/angular-ui-select/dist/select.js',
      'public/javascripts/lib/angular-bootstrap/ui-bootstrap.js',
      'public/javascripts/lib/angular-dialog-service/dist/dialogs.min.js',
      'public/javascripts/lib/ngAutocomplete/src/ngAutocomplete.js',
      'public/javascripts/lib/angular-google-maps/dist/angular-google-maps.js',
      //'public/javascripts/lib/moment/src/moment.js',
      'public/javascripts/lib/angular-moment/angular-moment.js',
      
      'public/javascripts/lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar.js',
      'public/javascripts/angularApp.js',
      'public/javascripts/services/viajesFactory.js',
      'public/javascripts/services/authFactory.js',
      'public/javascripts/controllers/mainCtrl.js',
      'public/javascripts/controllers/detalleCiudadCtrl.js',
      'public/javascripts/controllers/newViajeCtrl.js',

      'test/newViajeTest.js',
      'test/test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

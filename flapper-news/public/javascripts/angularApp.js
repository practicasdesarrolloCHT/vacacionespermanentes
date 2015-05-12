var app = angular.module('flapperNews', ['ui.router','ui.bootstrap','dialogs.main','ngAutocomplete','uiGmapgoogle-maps','mwl.calendar']);


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

$stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        viajePromise: ['viajes', function(viajes){
        return viajes.getAll();
        }]
      }
  })
  $urlRouterProvider.otherwise('home');
    
  $stateProvider
    .state('viajes', {
      url: '/viajes/{id}',
      templateUrl: '/viajes.html',
      controller: 'ViajesCtrl',
      resolve: {
          viaje: ['$stateParams', 'viajes', function($stateParams, viajes) {
          return viajes.get($stateParams.id);
        }]
      }
  });

  $stateProvider
  .state('createViaje', {
    url: '/createViaje',
    templateUrl: '/createViaje.html',
    controller: 'NewViajeCtrl',
    resolve: {
        //viaje: {}
    }
  });


  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
  });

  $stateProvider   
    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', function($state, auth){
        if(auth.isLoggedIn()){
          $state.go('home');
        }
      }]
  });
}
]);
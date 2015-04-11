app.controller('ViajesCtrl', [
'$scope',
'viajes',
'viaje',
'auth',
function($scope, viajes, viaje, auth){
  $scope.viaje = viaje; //viajes.viajes[$stateParams.id];
  $scope.isLoggedIn = auth.isLoggedIn;
  
  $scope.gotoHomePage = function(){
    viajes.gotoHomePage()
  };
}
]);
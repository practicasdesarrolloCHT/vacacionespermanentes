app.controller('NewViajeCtrl', [
'$scope',
'viajes',
//'viaje',
'auth',
function($scope, viajes,/* viaje,*/ auth){
  //$scope.viaje = viaje; //viajes.viajes[$stateParams.id];
  $scope.isLoggedIn = auth.isLoggedIn;
  
  $scope.gotoHomePage = function(){
    viajes.gotoHomePage()
  };

  $scope.addViaje = function(){
    if(!$scope.nombre || $scope.nombre === '') { return; }
    viajes.create({
      nombre: $scope.nombre,
      fecha_inicio: $scope.fecha_inicio,
      fecha_fin: $scope.fecha_fin
    });	
    $scope.nombre = '';
    $scope.fecha_inicio = '';
    $scope.fecha_fin = '';
  };

  $scope.openFrom = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedFrom = true;
  };

  $scope.openUntil = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedUntil = true;
  };
}
]);
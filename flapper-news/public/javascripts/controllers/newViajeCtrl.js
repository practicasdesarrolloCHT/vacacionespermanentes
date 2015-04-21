 
app.controller('NewViajeCtrl', [
'$scope',
'viajes',
'auth',
'dialogs',
function($scope, viajes, auth, dialogs){
  $scope.isLoggedIn = auth.isLoggedIn;
  
  $scope.gotoHomePage = function(){
    viajes.gotoHomePage()
  };

  $scope.addViaje = function(){
    if(!$scope.fecha_inicio || $scope.fecha_inicio === '' || !$scope.fecha_fin || $scope.fecha_fin === '' ) { return; }
    
    if(moment($scope.fecha_fin).isBefore($scope.fecha_inicio)) { 
        dlg = dialogs.notify('No puedes comenzar un viaje si ya lo has terminado!','La fecha de fin no puede ser menor a la fecha de fin.');
        return;
    } 

    viajes.create({
      nombre: $scope.nombre,
      fecha_inicio: $scope.fecha_inicio,
      fecha_fin: $scope.fecha_fin,
      destino: $scope.destino
    });	
    $scope.nombre = '';
    $scope.fecha_inicio = '';
    $scope.fecha_fin = '';
    $scope.destino = '';
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
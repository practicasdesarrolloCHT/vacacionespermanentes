var app = angular.module('flapperNews');

app.controller('MainCtrl', [
'$scope',
'viajes',
'auth',
'dialogs',
function($scope,viajes,auth,dialogs){
  $scope.test = 'Viajes';
  $scope.viajes = viajes.viajes;
  $scope.isLoggedIn = auth.isLoggedIn;
  //
  $scope.sort = "nombre";
  $scope.reverse = false;
  //
  $scope.changeSort = function(value){
    if ($scope.sort == value){
      $scope.reverse = !$scope.reverse;
      return;
    } 
    $scope.sort = value;
    $scope.reverse = false;
  }
  //
  $scope.createViajePage = function(){
    viajes.gotoCreateViajePage()
  };

  $scope.borrarViaje = function(viaje){
    dlg = dialogs.confirm('Por favor confirme','Esta seguro que quiere borrar el viaje: ' + viaje.nombre + '??');
    dlg.result.then(function(btn){
      viajes.borrarViaje(viaje._id, $scope.viajes.indexOf(viaje));
      //agregar mensaje de éxito en el borrado
    },function(btn){
      //agregar mensaje de cancelación
    });    
  };



  
}
]);

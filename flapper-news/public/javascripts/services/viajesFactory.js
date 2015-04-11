app.factory('viajes', ['$http', 'auth', function($http, auth){
  var o = {
    viajes: []
  };
  o.getAll = function() {
    return $http.get('/viajes').success(function(data){
      angular.copy(data, o.viajes);
    });
  };
  o.create = function(viajes) {
  return $http.post('/viajes', viaje, {
    headers: {Authorization: 'Bearer '+auth.getToken()}
    }).success(function(data){
      o.viajes.push(data);
    });
  };

  o.get = function(id) {
  return $http.get('/viajes/' + id).then(function(res){
      return res.data;
    });
  };
 
  o.gotoHomePage = function(){
    window.location='/#/home'
  }

  return o;
}
]);

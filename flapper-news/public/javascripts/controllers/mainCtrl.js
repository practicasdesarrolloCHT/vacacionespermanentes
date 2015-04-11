app.controller('MainCtrl', [
'$scope',
'viajes',
'auth',
function($scope,viajes,auth){
  $scope.test = 'Viajes';
  $scope.viajes = viajes.viajes;
  $scope.isLoggedIn = auth.isLoggedIn;

  $scope.addViaje = function(){
    if(!$scope.nombre || $scope.nombre === '') { return; }
    viajes.create({
      nombre: $scope.nombre,
      fecha_inicio: $scope.fecha_inicio,
      fecha_fin: $scope.fecha_fin,
    });
    $scope.nombre = '';
    $scope.fecha_inicio = '';
    $scope.fecha_fin = '';
  };
  
}
]);

/* COSAS ENTREGA ANTERIOR


app.controller('MainCtrl', [
'$scope',
'posts',
'auth',
function($scope,posts,auth){
  $scope.test = 'Posts';
  $scope.posts = posts.posts;
  $scope.isLoggedIn = auth.isLoggedIn;
  //
  $scope.sort = "upvotes";
  $scope.reverse = false;
  //
  $scope.addPost = function(){
  	if(!$scope.title || $scope.title === '') { return; }
  	posts.create({
      title: $scope.title,
      link: $scope.link,
    });
  	$scope.title = '';
  	$scope.link = '';
  };
  $scope.incrementUpvotes = function(post) {
    posts.upvote(post);
  };
  $scope.numberOfComments = function(post){
    posts.numberOfComments(post)
  }
  $scope.changeSort = function(value){
    if ($scope.sort == value){
      $scope.reverse = !$scope.reverse;
      return;
    } 
    $scope.sort = value;
    $scope.reverse = false;
  } 
}
]);

*/
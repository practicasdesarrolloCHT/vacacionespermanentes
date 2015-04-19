app.controller('MainCtrl', [
'$scope',
'viajes',
'auth',
'$dialogs',

function($scope,viajes,auth,$dialogs){
  $scope.test = 'Viajes';
  $scope.viajes = viajes.viajes;
  $scope.isLoggedIn = auth.isLoggedIn;

  $scope.createViajePage = function(){
    viajes.gotoCreateViajePage()
  };

  $scope.borrarViaje = function(viaje){
    


  dlg = $dialogs.confirm('Please Confirm','Is this awesome or what?');
        dlg.result.then(function(btn){
          
          viajes.borrarViaje(viaje._id, $scope.viajes.indexOf(viaje))
        },function(btn){
         
        });
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
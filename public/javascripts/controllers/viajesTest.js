describe("ViajesCtrl", function() {

    var scope, controller;
    var viajeFactory;

   

    beforeEach(function(){
      module('flapperNews', function($provide) {

        dialogs = {   confirm: function(titulo,mensaje){ }     }  
           
        $provide.value('dialogs', dialogs);

    });

    });

    beforeEach(inject(function(_viajes_) {
        viajeFactory = _viajes_;
    }));

    beforeEach(inject(function ($q) {  q =$q  }));

    beforeEach(inject(function($controller, $rootScope) {
        
        scope = $rootScope.$new();
        controller = $controller('ViajesCtrl', { $scope: scope });
     }));


    


    it("Prueba piloto", function() {

       expect(scope.punto_interes).toEqual('');


    });


});

describe("MainCtrl", function() {

    var scope, controller;
    var viajeFactory;

    beforeEach(function(){
        module('flapperNews', function($provide) {


            dialogs = { confirm: function(titulo,mensaje){ }  }  
                
          $provide.value('dialogs', dialogs);
        });

    });

    beforeEach(inject(function ($q) {  q =$q  }));


    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('MainCtrl', { $scope: scope });
    }));
    
    //guardando el factory de viaje
    beforeEach(inject(function(_viajes_) {
        viajeFactory = _viajes_;
    }));
    //

    it("Prueba piloto", function() {
        expect(scope.test).toEqual('Viajes');
        expect(scope.sort).toEqual('nombre');
    });

//Testeando sort y reverse    

    it("Testear valor inicial del sort y reverse", function() {
        expect(scope.sort).toEqual('nombre');
        expect(scope.reverse).toBeFalsy();
    });

    it("Testear changesort cuando el value es el mismo, por lo que deberia dejar el sort como esta y cambiar el reverse", function() {
        
        // De false que es el valor inicial cambia a true

        expect(scope.sort).toEqual('nombre');        
        expect(scope.reverse).toBeFalsy();

        scope.changeSort("nombre");

        expect(scope.sort).toEqual('nombre');        
        expect(scope.reverse).toBeTruthy();

        // De true que es el valor que quedo al realizar el cambio nuevamente cambia, esta vez a true
        scope.changeSort("nombre");

        expect(scope.sort).toEqual('nombre');        
        expect(scope.reverse).toBeFalsy();
    });

    it("Testear changesort cuando el value es distinto, por lo que deberia cambiar el sort y dejar el reverse como esta", function() {
        expect(scope.sort).toEqual('nombre');        
        expect(scope.reverse).toBeFalsy();

        scope.changeSort("fecha_inicio");

        expect(scope.sort).toEqual('fecha_inicio');        
        expect(scope.reverse).toBeFalsy();
    });

//Test sobre estado y la comunicacion con viajeFactory

    it("Test valor inicial de la lista de viajes", function() {
        expect(scope.viajes).toEqual([]);
    });

    it("Test de llamada al método del viajeFactory", function() {
        spyOn(viajeFactory,"gotoCreateViajePage");
        scope.createViajePage();
        expect(viajeFactory.gotoCreateViajePage).toHaveBeenCalled();
    });

    it("Al elegir borrar un viaje, aparece la ventana de confirmacion y la respuesta es cancelar la accion", function() {

        var mock_viaje_a_borrar = { nombre: "otro viaje", _id: 0};
        scope.viajes = [ {nombre: "un viaje al azar"}, mock_viaje_a_borrar ];

        var deferred = q.defer();
        deferred.resolve('no');
        spyOn(dialogs,"confirm").and.returnValue({result:deferred.promise});
        spyOn(viajeFactory,"borrarViaje");
        
        scope.borrarViaje(mock_viaje_a_borrar);
        
        expect(dialogs.confirm).toHaveBeenCalledWith('Por favor confirme','Esta seguro que quiere borrar el viaje: otro viaje?');
        expect(viajeFactory.borrarViaje).not.toHaveBeenCalledWith(0,1)

        
    });

    it("Al elegir borrar un viaje, aparece la ventana de confirmacion y si la respuesta es confirmar la accion enviar un mensaje al viaje" + 
        "factory para borrar dicho viaje", function() {

        var mock_viaje_a_borrar = { nombre: "otro viaje", _id: 0};
        scope.viajes = [ mock_viaje_a_borrar, {nombre: "un viaje al azar"} ];

        var deferred = q.defer();
        deferred.resolve('yes');
        spyOn(dialogs,"confirm").and.returnValue({result:deferred.promise});
        spyOn(viajeFactory,"borrarViaje");
        
        scope.borrarViaje(mock_viaje_a_borrar);
        scope.$apply();
        
        expect(dialogs.confirm).toHaveBeenCalledWith('Por favor confirme','Esta seguro que quiere borrar el viaje: otro viaje?');
        expect(viajeFactory.borrarViaje).toHaveBeenCalledWith(0,0)

        
    });

});
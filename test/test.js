describe("MainCtrl", function() {

    var scope, controller;
    var viajeFactory;

    beforeEach(function(){
        module('flapperNews');

    });

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

    //In progress 
    //it("Test de llamada al método del viajeFactory", function() {
    //    var viaje1 = new Viajes()
    //    spyOn(viajeFactory,"gotoCreateViajePage");
    //    scope.createViajePage();
    //    expect(viajeFactory.gotoCreateViajePage).toHaveBeenCalled();
    //});
});



//var assert = require("assert")
//describe('Array', function(){
//  describe('#indexOf()', function(){
//      it('should return -1 when the value is not present', function(){
//            assert.equal(-1, [1,2,3].indexOf(5));
//	          assert.equal(-1, [1,2,3].indexOf(0));
//		      })
//		        })
//			})

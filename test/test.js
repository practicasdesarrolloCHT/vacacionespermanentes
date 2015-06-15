describe("MainCtrl", function() {

    var scope, controller;

    beforeEach(function(){
        module('flapperNews');

    });

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('MainCtrl', { $scope: scope });
    }));

    it("Prueba piloto", function() {
        expect(scope.test).toEqual('Viajes');
        expect(scope.sort).toEqual('nombre');
    });

//Testeando sort y reverse    

    it("Testear valor inicial del sort y reverse", function() {
        expect(scope.sort).toEqual('nombre');
        expect(scope.reverse).toEqual(false);
    });

    it("Testear changesort cuando el value es el mismo, por lo que deberia dejar el sort como esta y cambiar el reverse", function() {
        
        // De false que es el valor inicial cambia a true

        expect(scope.sort).toEqual('nombre');        
        expect(scope.reverse).toEqual(false);

        scope.changeSort("nombre");

        expect(scope.sort).toEqual('nombre');        
        expect(scope.reverse).toEqual(true);

        // De true que es el valor que quedo al realizar el cambio nuevamente cambia, esta vez a true
        scope.changeSort("nombre");

        expect(scope.sort).toEqual('nombre');        
        expect(scope.reverse).toEqual(false);
    });

    it("Testear changesort cuando el value es distinto, por lo que deberia cambiar el sort y dejar el reverse como esta", function() {
        expect(scope.sort).toEqual('nombre');        
        expect(scope.reverse).toEqual(false);

        scope.changeSort("fecha_inicio");

        expect(scope.sort).toEqual('fecha_inicio');        
        expect(scope.reverse).toEqual(false);
    });
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

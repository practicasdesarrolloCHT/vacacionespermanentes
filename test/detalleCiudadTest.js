describe("DetalleCiudadCtrl", function() {

    var scope, controller;
    var viajeFactory;


   

    beforeEach(function(){
      module('flapperNews', function($provide) {

      ciudad = {
                    "nombre" : "Jacksonville, Florida, Estados Unidos",
                    "cantidadDeDias" : 7,
                    "latitude" : 30.3321838,
                    "longitude" : -81.65565099999998,
                    "message" : "Destino numero 1",
                    "pais" : "US",
                    "puntosDeInteres" : [
                            {
                                    "nombre" : "The Jacksonville Landing, Independent Drive, Jacksonville, Florida, Estados Unidos",
                                    "direccion" : "2 W Independent Dr, Jacksonville, FL 3220 2, Estados Unidos",
                                    "latitude" : 30.324827,
                                    "longitude" : -81.65988700000003,
                                    "calificacion" : 3.6,
                                    "website" : "http://www.jacksonvillelanding.com/"
                            }
                    ],
                    "hotelReference" : "Grand Lodge of Florida"
                }      
      $provide.value('ciudad', ciudad);
    });

    });

    beforeEach(inject(function($controller, $rootScope) {
        
        scope = $rootScope.$new();
        controller = $controller('DetalleCiudadCtrl', { $scope: scope });
    }));


    it("Prueba piloto", function() {
        console.log(scope.punto_interes)
        expect(scope.punto_interes).toEqual('');


    });


});

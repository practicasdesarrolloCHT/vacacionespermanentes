describe("DetalleCiudadCtrl", function() {

    var scope, controller;
    var viajeFactory;

   

    beforeEach(function(){
      module('flapperNews', function($provide) {

    dialogs = {

        confirm: function(titulo,mensaje){ }
       }  

            
      $provide.value('dialogs', dialogs);




      ciudad = {
                    "_id": "id1",
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

    beforeEach(inject(function(_viajes_) {
        viajeFactory = _viajes_;
    }));

    beforeEach(inject(function ($q) {
        q =$q
            
        }));

    beforeEach(inject(function($controller, $rootScope) {
        
        scope = $rootScope.$new();
        controller = $controller('DetalleCiudadCtrl', { $scope: scope });

        scope.hoteles= [
                            {"nombre":"Grand Lodge of Florida","id":"ChIJ_XTuTRi35YgROweRBPKIdpo","direccion":"220 North Ocean Street, Jacksonville, FL 32202, Estados Unidos","numero_telefono":"(800) 375-2339","numero_telefono_internacional":"+1 800-375-2339","website":"http://www.glflamason.org/"},
                            {"nombre":"Windsom Travel, Travel Agent","id":"ChIJjwJUrhe35YgRJBV1M_IccvA","direccion":"223 West Adams Street, Jacksonville, FL 32202, Estados Unidos","numero_telefono":"(904) 562-2075","numero_telefono_internacional":"+1 904-562-2075"},
                            {"nombre":"omni hotel","id":"ChIJCRW-9SK35YgR_aBvOllWX9Y","direccion":"Jacksonville, FL, Estados Unidos"}
                        ]
        scope.map = { center:{ latitude: 30.324827, 
                            longitude: -81.65988700000003 }, zoom: 15 }



    }));


    it("Testando que el centrar mapa cambia los valores del scope map para volver a centrar el mapa", function() {
        
        expect(scope.map).toEqual({ center:{ latitude: 30.324827, 
                                            longitude: -81.65988700000003 }, zoom: 15 });
        scope.centrarMapa(35.32,38.324);
        expect(scope.map).toEqual({ center:{ latitude: 35.32, 
                                            longitude: 38.324 }, zoom: 15 });



    });

    it("Testando que al llamar al mensaje addNewChoice, si el punto de interes que fue seleccionado tiene latitud, longitud, calificacion, website, nombre y direccion, guarde dicho punto con todos sus datos en la lista de puntos de interes de la ciudad", function() {

        scope.punto_interes = "El nombre del lugar";
        
        scope.details = {
                            "formatted_address": "Calle falsa 123",
                            "geometry": { "location" : { "A": "37.32","F":"39.324"} },
                            "rating": "1.3",
                            "website": "http://algoquevisitar.com"
                        };
        informacion  = {"nombre": "El nombre del lugar", "direccion": "Calle falsa 123", "latitude": 37.32, "longitude": 39.324, 
                        "calificacion": "1.3", "website": "http://algoquevisitar.com"  };
        
        expect(scope.ciudad.puntosDeInteres.length).toEqual(1);
        spyOn(scope,"guardarEdicionDeCiudad");
        spyOn(scope,"centrarMapa");
        
        scope.addNewChoice();
        
        
        expect(scope.guardarEdicionDeCiudad).toHaveBeenCalled();
        expect(scope.centrarMapa).toHaveBeenCalledWith(37.32,39.324);       
        expect(scope.punto_interes).toEqual("");
        expect(scope.ciudad.puntosDeInteres.length).toEqual(2);



    });

    it("Testando que al llamar al mensaje addNewChoice, si el punto de interes que fue seleccionado no tiene calificacion y website, no pinche y guarde el punto de interes con los datos que si posee en la lista de la ciudad", function() {

        scope.punto_interes = "El nombre del lugar";
        
        scope.details = {
                            "formatted_address": "Calle falsa 123",
                            "geometry": { "location" : { "A": "37.32","F":"39.324"} },
                        };
        informacion  = {"nombre": "El nombre del lugar", "direccion": "Calle falsa 123", "latitude": 37.32, "longitude": 39.324};
        
        expect(scope.ciudad.puntosDeInteres.length).toEqual(1);
        spyOn(scope,"guardarEdicionDeCiudad");
        spyOn(scope,"centrarMapa");
        
        scope.addNewChoice();
        
        
        expect(scope.guardarEdicionDeCiudad).toHaveBeenCalled();
        expect(scope.centrarMapa).toHaveBeenCalledWith(37.32,39.324);       
        expect(scope.punto_interes).toEqual("");
        expect(scope.ciudad.puntosDeInteres.length).toEqual(2);



    });
   

    it("Cuando se llama al mensaje guardarEdicionDeCiudad este hace una llamada al viaje factory con el id de la ciudad y los puntos de interes actuales para guardar la edicion de los mismos", function() {
        spyOn(viajeFactory,"guardarEdicionDeCiudad");
        puntos = { puntosDeInteres: scope.ciudad.puntosDeInteres };
        scope.guardarEdicionDeCiudad();
        expect(viajeFactory.guardarEdicionDeCiudad).toHaveBeenCalledWith(scope.ciudad._id,puntos);

    });

     it("Llamar a la funcion de borrado de un punto de interes y cancelar en el mensaje de confirmacion", function() {
        
        punto_interes = {
                                    "nombre" : "The Jacksonville Landing, Independent Drive, Jacksonville, Florida, Estados Unidos",
                                    "direccion" : "2 W Independent Dr, Jacksonville, FL 3220 2, Estados Unidos",
                                    "latitude" : 30.324827,
                                    "longitude" : -81.65988700000003,
                                    "calificacion" : 3.6,
                                    "website" : "http://www.jacksonvillelanding.com/"
                            }


        var deferred = q.defer();
        deferred.resolve('yes');
        spyOn(dialogs,"confirm").and.returnValue({result:deferred.promise});
        scope.borrarPuntoDeInteres(punto_interes);
        expect(dialogs.confirm).toHaveBeenCalledWith('Por favor confirme','¿Esta seguro que quiere borrar el punto de interes: The Jacksonville Landing, Independent Drive, Jacksonville, Florida, Estados Unidos?');



    });



    it("Prueba piloto", function() {
        expect(scope.punto_interes).toEqual('');


    });


});
 

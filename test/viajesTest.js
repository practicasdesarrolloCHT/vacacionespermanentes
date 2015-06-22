describe("ViajesCtrl", function() {

    var scope, controller;
    var viajeFactory;


    beforeEach(function(){
      module('flapperNews', function($provide) {

        dialogs = {   confirm: function(titulo,mensaje){ }     } 

        moment= function(string) {
        return {   add: function(numero, dias){  return string },
                  format: function(algo) {return string} }
        };  
           
        $provide.value('dialogs', dialogs);
        $provide.value('moment', moment);

        


        viaje = {"_id":"558760156ecaf68815934c7e","nombre":"Viaje ejemplo","usuario":"tatti",
                 "fecha_inicio":"2015-06-07T03:00:00.000Z","fecha_fin":"2015-06-23T03:00:00.000Z",
                 "ciudades":[ {"_id":"1","nombre":"Mendoza, Argentina","cantidadDeDias":7,"latitude":-32.8894587,"longitude":-68.84583859999998,
                                "message":"Destino numero 1","pais":"AR","hotelReference":"Gran Hotel Mendoza","puntosDeInteres":[]},
                              {"_id":"2","nombre":"Córdoba, Argentina","cantidadDeDias":7,"latitude":-31.42008329999999,"longitude":-64.18877609999998,
                               "message":"Destino numero 2","pais":"AR","puntosDeInteres":[]},
                              {"_id":"3","nombre":"Salta, Argentina","cantidadDeDias":3,"latitude":-24.7830773,"longitude":-65.41037389999997,
                               "message":"Destino numero 3","pais":"AR","puntosDeInteres":[]}]}      
          
        $provide.value('viaje', viaje);

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


    
    it("Verificando valores de las variables iniciales", function() {

        viaje_esperado = {"_id":"558760156ecaf68815934c7e","nombre":"Viaje ejemplo","usuario":"tatti",
                          "fecha_inicio":"2015-06-07T03:00:00.000Z","fecha_fin":"2015-06-23T03:00:00.000Z",
                          "ciudades":[ {"_id":"1","nombre":"Mendoza, Argentina","cantidadDeDias":7,"latitude":-32.8894587,"longitude":-68.84583859999998,
                                        "message":"Destino numero 1","pais":"AR","hotelReference":"Gran Hotel Mendoza","puntosDeInteres":[]},
                                       {"_id":"2","nombre":"Córdoba, Argentina","cantidadDeDias":7,"latitude":-31.42008329999999,"longitude":-64.18877609999998,
                                        "message":"Destino numero 2","pais":"AR","puntosDeInteres":[]},
                                       {"_id":"3","nombre":"Salta, Argentina","cantidadDeDias":3,"latitude":-24.7830773,"longitude":-65.41037389999997,
                                        "message":"Destino numero 3","pais":"AR","puntosDeInteres":[]}]}

        expect(scope.viaje).toEqual(viaje_esperado);
        expect(scope.result).toEqual('');
        expect(scope.details).toEqual('');
        expect(scope.options).toEqual({ types: '(cities)', watchEnter: true });
        expect(scope.cantidadDeDias).toEqual(null);
        expect(scope.map).toEqual({ center: { latitude: -24.7830773, longitude: -65.41037389999997 }, zoom: 10 });
        expect(scope.isCollapsed).toBeTruthy();

    });


    it("Test de llamada al método del gotoHomePage delegue responsabilidad en el viajeFactory", function() {
        spyOn(viajeFactory,"gotoHomePage");
        scope.gotoHomePage();
        expect(viajeFactory.gotoHomePage).toHaveBeenCalled();
    });

    it("Testeando agregar una nueva ciudad a la lista de ciudades del viaje, para ello delegara agregarlo al viaje "+ 
        "en la base de datos al viajeFactory" , function() {

        scope.cantidadDeDias = 7,
        scope.nombre_ciudad = "La ciudad de prueba"

        scope.details = {
                            address_components: [{ types : 'country', short_name: 'AR'}],
                            geometry: { location : { A: "37.32",F:"39.324"} },
                        };

        spyOn(viajeFactory, "agregarCiudad").and.returnValue( {success : function(algo) {} } );
        scope.agregarCiudad();

        datos_completos = { nombre: 'La ciudad de prueba', cantidadDeDias: 7, latitude: 37.32, longitude: 39.324, 
                            message: 'Destino numero 4', pais: 'AR', puntosDeInteres: [  ], hotel: {  } };

        expect(viajeFactory.agregarCiudad).toHaveBeenCalledWith("558760156ecaf68815934c7e",datos_completos);

    });

    it("Llamar a la funcion de borrado de una  ciudad y cancelar en el mensaje de confirmacion", function() {
        
        

        ciudad = {"_id":"1","nombre":"Mendoza, Argentina","cantidadDeDias":7,"latitude":-32.8894587,"longitude":-68.84583859999998,
                  "message":"Destino numero 1","pais":"AR","hotelReference":"Gran Hotel Mendoza","puntosDeInteres":[]}

        expect(scope.viaje.ciudades.length).toEqual(3);
        expect(scope.viaje.ciudades).toContain(ciudad);
        var deferred = q.defer();
        deferred.resolve('no');
        spyOn(dialogs,"confirm").and.returnValue({result:deferred.promise});
        
        scope.borrarCiudad(ciudad);
        
        expect(dialogs.confirm).toHaveBeenCalledWith('Por favor confirme','Esta seguro que quiere borrar la ciudad: Mendoza, Argentina?');
        expect(scope.viaje.ciudades.length).toEqual(3);
        expect(scope.viaje.ciudades).toContain(ciudad);


    });


    it("Llamar a la funcion de borrado de una  ciudad y aceptar en el mensaje de confirmacion delegando el borrado " + 
        "en el viajeFactory", function() {
        
        

        ciudad = {"_id":"1","nombre":"Mendoza, Argentina","cantidadDeDias":7,"latitude":-32.8894587,"longitude":-68.84583859999998,
                  "message":"Destino numero 1","pais":"AR","hotelReference":"Gran Hotel Mendoza","puntosDeInteres":[]}

        expect(scope.viaje.ciudades.length).toEqual(3);
        expect(scope.viaje.ciudades).toContain(ciudad);
        spyOn(viajeFactory,"borrarCiudad").and.returnValue( {success : function(algo) {} } );
        var deferred = q.defer();
        deferred.resolve('yes');
        spyOn(dialogs,"confirm").and.returnValue({result:deferred.promise});
        
        scope.borrarCiudad(ciudad);
        scope.$apply();
        
        expect(dialogs.confirm).toHaveBeenCalledWith('Por favor confirme','Esta seguro que quiere borrar la ciudad: Mendoza, Argentina?');
        expect(viajeFactory.borrarCiudad).toHaveBeenCalledWith('558760156ecaf68815934c7e', -1, '1', -1);


    });

    it("Test de llamada al método del guardarEdicionDeViaje delegue responsabilidad en el viajeFactory llamando al mensaje " +
        " guardarEdicionDeViaje del mismo con los correspondientes parametros", function() {
        
        spyOn(viajeFactory,"guardarEdicionDeViaje");
        scope.guardarEdicionDeViaje();

        viaje = { nombre:"Viaje ejemplo",
                  fecha_inicio:"2015-06-07T03:00:00.000Z", 
                  fecha_fin:"2015-06-23T03:00:00.000Z",
                  ciudades:[ {"_id":"1","nombre":"Mendoza, Argentina","cantidadDeDias":7,"latitude":-32.8894587,"longitude":-68.84583859999998,
                              "message":"Destino numero 1","pais":"AR","hotelReference":"Gran Hotel Mendoza","puntosDeInteres":[]},
                             {"_id":"2","nombre":"Córdoba, Argentina","cantidadDeDias":7,"latitude":-31.42008329999999,"longitude":-64.18877609999998,
                              "message":"Destino numero 2","pais":"AR","puntosDeInteres":[]},
                             {"_id":"3","nombre":"Salta, Argentina","cantidadDeDias":3,"latitude":-24.7830773,"longitude":-65.41037389999997,
                              "message":"Destino numero 3","pais":"AR","puntosDeInteres":[]}]}

        expect(viajeFactory.guardarEdicionDeViaje).toHaveBeenCalledWith("558760156ecaf68815934c7e", viaje);
    });



});


describe("NewViajeCtrl", function() {

    var scope, controller;
    var viajeFactory;



    beforeEach(function(){
      module('flapperNews', function($provide) {


      dialogs = {

        notify: function(mensaje){ }
       }  

            
      $provide.value('dialogs', dialogs);
    });

    });

    beforeEach(inject(function(_viajes_) {
        viajeFactory = _viajes_;
    }));

    beforeEach(inject(function($controller, $rootScope) {
        
        scope = $rootScope.$new();
        controller = $controller('NewViajeCtrl', { $scope: scope });
    }));

    it("Test de llamada al método del gotoHomePage", function() {
        spyOn(viajeFactory,"gotoHomePage");
        scope.gotoHomePage();
        expect(viajeFactory.gotoHomePage).toHaveBeenCalled();
    });

    it("Test de que la fecha de fin no puede ser posterior a la del principio", function() {

        moment= function(string) {
        return {   isBefore: function(mensaje){  return true } }
        };
        scope.fecha_inicio='Fri Jun 19 2015 00:00:00 GMT-0300';
        scope.fecha_fin='Fri Feb 28 2014 00:00:00 GMT-0300';
        spyOn(dialogs,"notify");
        scope.addViaje();
        expect(dialogs.notify).toHaveBeenCalledWith('No puedes comenzar un viaje si ya lo has terminado!','La fecha de fin no puede ser menor a la fecha de fin.');
        
    });

    it("Cuando la fecha de fin es mayor a la de inicio se guarda el viaje con los valores que estan en el scope y luego limpiar las variables del scope.", function() {


        moment= function(string) {
        return {   isBefore: function(mensaje){  return false } }
        };
        

        scope.fecha_fin='Fri Jun 19 2015 00:00:00 GMT-0300';
        scope.fecha_inicio='Fri Feb 28 2014 00:00:00 GMT-0300';
        scope.nombre="Un nombre de viaje";

        viaje_a_guardar = {
                            nombre: "Un nombre de viaje",
                            usuario: "",
                            fecha_inicio: 'Fri Feb 28 2014 00:00:00 GMT-0300',
                            fecha_fin: 'Fri Jun 19 2015 00:00:00 GMT-0300'      
                         }
        
        spyOn(viajeFactory,"create");
        scope.addViaje();
        expect(viajeFactory.create).toHaveBeenCalledWith(viaje_a_guardar);

        expect(scope.fecha_fin).toEqual("");
        expect(scope.fecha_inicio).toEqual("");
        expect(scope.nombre).toEqual("");

    });



});

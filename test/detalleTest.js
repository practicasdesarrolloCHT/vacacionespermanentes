describe("DetalleCtrl", function() {

    var scope, controller;
    var viajeFactory;

   

    beforeEach(function(){
      module('flapperNews', function($provide) {

      punto_seleccionado = {nombre: "Hotel Mendoza", 
                            id: "ChIJ0fyExRsJfpYRYgNNu47KhC4", 
                            direccion: "Avenida España 1210, 5500 Mendoza, Mendoza, Argentina", 
                            numero_telefono: "0261 405-1405", 
                            numero_telefono_internacional: "+54 261 405-1405",
                            calificacion: 4.5,
                            comentarios_huespedes: [{autor: "Lorraine Beans", raiting: 5 , texto: "Buenísimo!!!!!  Muy cómodo "},
                                                    {autor: "Jose Beans", raiting: 5 , texto: "Muy bueno!!!!!  comodisimo "}],
                            website: "http://www.hotelmendoza.com/"};

      $provide.value('punto_seleccionado', punto_seleccionado);

      modalInstance = {     close: function() {}       }

      $provide.value('$modalInstance', modalInstance);

    });

    });


    beforeEach(inject(function($controller, $rootScope) {
        
        scope = $rootScope.$new();
        controller = $controller('DetalleCtrl', { $scope: scope });

    }));

    it("Comprobando los valores de las variables iniciales ", function() {
            
            expect(scope.isCollapsed).toBeTruthy();
            expect(scope.isReadonly).toBeTruthy();
            expect(scope.max).toEqual(5);

        });

    it("Comprobando los valores que deben tener las variables que denotan si es que estan los datos del lugar, en este caso deben ser todas true", 

        function() {
            
            expect(scope.is_numero_telefono).toBeTruthy();
            expect(scope.is_raiting).toBeTruthy();
            expect(scope.is_direccion).toBeTruthy();
            expect(scope.is_numero_telefono_internacional).toBeTruthy();
            expect(scope.is_website).toBeTruthy();
            expect(scope.is_comentarios_huespedes).toBeTruthy();   

        });

    it("Comprobando el valor que debe tener rate (la calificacion) y el porcentaje para escribirlo y mostrarlo en pantalla", function() {

            expect(scope.rate).toEqual(4.5);
            expect(scope.percent).toEqual(90);

        });

    it("Cuando se envia el mensaje ok, debe redirigirse el mensaje a la modalInstance para que cierre la modal.", function() {

            spyOn(modalInstance,"close");
            scope.ok();
            expect(modalInstance.close).toHaveBeenCalled(); //With()

        });


});



/**


  if ( $scope.punto.numero_telefono) $scope.is_numero_telefono = true;
  else $scope.is_numero_telefono = false;
 
  if ( $scope.punto.calificacion) {
    $scope.is_raiting = true;
    $scope.rate = $scope.punto.calificacion; 
    $scope.percent = (100 * $scope.rate) / $scope.max;
  }
  else $scope.is_raiting = false; 

  if ($scope.punto.direccion) $scope.is_direccion = true;
  else $scope.is_direccion = false; 

  if ($scope.punto.numero_telefono_internacional) $scope.is_numero_telefono_internacional = true;
  else $scope.is_numero_telefono_internacional = false; 

  if ($scope.punto.website) $scope.is_website = true;
  else $scope.is_website = false;

  if ($scope.punto.comentarios_huespedes) $scope.is_comentarios_huespedes = true;
  else $scope.is_comentarios_huespedes = false;  
**/
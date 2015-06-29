var mongoose = require('mongoose');

//conectarse a una base nueva
mongoose.connect('mongodb://localhost/test');

//Sólo para hacer que los pasos del protractor sean más lentos
var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};
//////////////////////////

describe('Vacaciones Permanentes App', function() {
  var listaViajes = [];
  var dbUsers,dbViajes,dbCiudades;
  
  beforeEach(function(){
  	
    //limpiar la base cada vez que se quiere testear
    dbUsers = mongoose.connection.db.collection('users');
  	dbUsers.drop(function(err, result) {
  		console.log("drop users " + result)
  	});
	  dbViajes = mongoose.connection.db.collection('viajes');
  	dbViajes.drop(function(err, result) {
  		console.log("drop viajes " + result)
  	});
  	dbCiudades = mongoose.connection.db.collection('ciudads');
  	dbCiudades.drop(function(err, result) {
  		console.log("drop ciudades " + result)
  	});

    browser.sleep(2000);

    browser.get('http://localhost:3000/#/register');
    
    element(by.model('user.username')).sendKeys("protractor");
  	element(by.model('user.password')).sendKeys("protractor");

  	element(by.id('submitReg')).click();

    listaViajes = element.all(by.repeater('viaje in viajes'));

    element(by.id('crearViaje')).click();

    element(by.model('nombre')).sendKeys("Viaje Protractor");
    element(by.model('fecha_inicio')).sendKeys("20.06.2015");
    element(by.model('fecha_fin')).sendKeys("30.06.2015");

    element(by.id('submitCreateViaje')).click();

    element(by.id('href_a_viaje')).click();


    element(by.id('Autocomplete')).sendKeys("Buenos Aires, CABA, Argentina\n");
    element(by.model('cantidadDeDias')).sendKeys(7);
    element(by.css('[ng-click="agregarCiudad()"]')).click();

    element(by.id('ciudad_href')).click();

    browser.sleep(2000);
    

  });

  it('Detalle de la ciudad ya creada, al entrar a la pagina coincidan los datos', function() {

    var puntos = element.all(by.repeater('punto in ciudad.puntosDeInteres'));

    nombre_ciudad = element(by.id('nombre_ciudad')).getText();
    expect(nombre_ciudad).toEqual('Buenos Aires, CABA, Argentina');

    expect(puntos.count()).toEqual(0);

    element(by.id('desloguearse')).click();


  });


   it('Agregar un hotel a la ciudad creada que ahora no posee ninguno', function() {

    var puntos = element.all(by.repeater('punto in ciudad.puntosDeInteres'));
    var markers = element.all(by.repeater('marker in ciudad.puntosDeInteres'));

    expect(puntos.count()).toEqual(0);
    expect(markers.count()).toEqual(0);

   // element(by.id('nombre_hotel')).sendKeys("Hotel Las Naciones\n");
   // CAN NOT FOCUS ?
    
    element(by.id('desloguearse')).click();


  });

  it('Agregar puntos de interes a la ciudad creada que ahora no posee ninguno', function() {

    var puntos = element.all(by.repeater('punto in ciudad.puntosDeInteres'));
    var markers = element.all(by.repeater('marker in ciudad.puntosDeInteres'));

    expect(puntos.count()).toEqual(0);
    expect(markers.count()).toEqual(0);

   element(by.id('Autocomplete')).sendKeys("Obelisco - Avenida 9 de Julio, Buenos Aires, Ciudad Autonoma de Buenos Aires, Argentina\n");
   browser.sleep(2000);
   element(by.css('[ng-click="addNewChoice()"]')).click();
   
   element(by.id('Autocomplete')).sendKeys("Plaza\n");
   browser.sleep(2000);
   element(by.css('[ng-click="addNewChoice()"]')).click();
   
   element(by.id('Autocomplete')).sendKeys("Congreso\n");
   browser.sleep(2000);
   element(by.css('[ng-click="addNewChoice()"]')).click();
   
   expect(puntos.count()).toEqual(3);
   expect(markers.count()).toEqual(3);

    
    element(by.id('desloguearse')).click();


  });

  it('Borrar un punto de interes de la ciudad ya existente y presionar no en la ventana de confirmacion', function() {

    var puntos = element.all(by.repeater('punto in ciudad.puntosDeInteres'));
    var markers = element.all(by.repeater('marker in ciudad.puntosDeInteres'));

    expect(puntos.count()).toEqual(0);
    expect(markers.count()).toEqual(0);

   element(by.id('Autocomplete')).sendKeys("Obelisco - Avenida 9 de Julio, Buenos Aires, Ciudad Autonoma de Buenos Aires, Argentina\n");
   browser.sleep(2000);
   element(by.css('[ng-click="addNewChoice()"]')).click();
   
   expect(puntos.count()).toEqual(1);
   expect(markers.count()).toEqual(1);

   element(by.id('borrar_punto_interes')).click();
   element(by.css('[ng-click="no()"]')).click();

   expect(puntos.count()).toEqual(1);
   expect(markers.count()).toEqual(1);

    
   element(by.id('desloguearse')).click();


  });

 it('Borrar un punto de interes de la ciudad ya existente y presionar si en la ventana de confirmacion', function() {

    var puntos = element.all(by.repeater('punto in ciudad.puntosDeInteres'));
    var markers = element.all(by.repeater('marker in ciudad.puntosDeInteres'));

    expect(puntos.count()).toEqual(0);
    expect(markers.count()).toEqual(0);

   element(by.id('Autocomplete')).sendKeys("Obelisco - Avenida 9 de Julio, Buenos Aires, Ciudad Autonoma de Buenos Aires, Argentina\n");
   browser.sleep(2000);
   element(by.css('[ng-click="addNewChoice()"]')).click();
   
   expect(puntos.count()).toEqual(1);
   expect(markers.count()).toEqual(1);

   element(by.id('borrar_punto_interes')).click();
   element(by.css('[ng-click="yes()"]')).click();

   expect(puntos.count()).toEqual(0);
   expect(markers.count()).toEqual(0);

    
   element(by.id('desloguearse')).click();


  });





  browser.sleep(2000);
}); 
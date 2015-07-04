var mongoose = require('mongoose');

//Sólo para hacer que los pasos del protractor sean más lentos
var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(10);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};
//////////////////////////

describe('Vacaciones Permanentes App', function() {
  var listaViajes = [];
  var dbUsers,dbViajes,dbCiudades;

  
  beforeEach(function(){

    //conectarse a una base nueva
    
  	
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
    browser.sleep(2000);


    element(by.id('Autocomplete')).sendKeys("Buenos Aires, CABA, Argentina\n");
    element(by.model('cantidadDeDias')).sendKeys(7);
    browser.sleep(2000);
    element(by.css('[ng-click="agregarCiudad()"]')).click();


    element(by.id('ciudad_href')).click();

   element(by.id('Autocomplete')).sendKeys("Obelisco - Avenida 9 de Julio, Buenos Aires, Ciudad Autonoma de Buenos Aires, Argentina\n");
   browser.sleep(2000);
   element(by.css('[ng-click="addNewChoice()"]')).click();

    browser.sleep(2000);
    

  });


 

 it('Testear volver a la home y poder llevar al mismo viaje', function() {
  
  browser.get('http://localhost:3000/#/home');

  element(by.id('href_a_viaje')).click();

  var ciudades = element.all(by.repeater('ciudad in viaje.ciudades'));

  nombre = element(by.id('nombre_viaje')).getText();
  usuario = element(by.id('usuario_nombre')).getText();
  fecha_inicio_text = element(by.id('fecha_inicio_text')).getText();
  fecha_fin_text = element(by.id('fecha_fin_text')).getText();
    
    
  expect(nombre).toEqual('Viaje Protractor');
  expect(usuario).toEqual('Usuario: protractor');
  expect(fecha_inicio_text).toEqual('Fecha inicio: Saturday, June 20, 2015');
  expect(fecha_fin_text).toEqual('Fecha fin   : Tuesday, June 30, 2015');

  expect(ciudades.count()).toEqual(1);


  browser.sleep(2000);
  element(by.id('ciudad_href')).click();

  var puntos = element.all(by.repeater('punto in ciudad.puntosDeInteres'));

  nombre_ciudad = element(by.id('nombre_ciudad')).getText();
  expect(nombre_ciudad).toEqual('Buenos Aires, CABA, Argentina');

  expect(puntos.count()).toEqual(1);

  element(by.id('desloguearse')).click();
   


  });


it('Testear desloguearse y volver a la home y poder llevar al mismo viaje, es decir que se persista', function() {

  element(by.id('desloguearse')).click();

  browser.get('http://localhost:3000/#/login');
  element(by.id('loguearse')).click();



  element(by.model('user.username')).sendKeys("protractor");
  element(by.model('user.password')).sendKeys("protractor");

  element(by.id('submitLog')).click();
  

  element(by.id('href_a_viaje')).click();

  var ciudades = element.all(by.repeater('ciudad in viaje.ciudades'));

  nombre = element(by.id('nombre_viaje')).getText();
  usuario = element(by.id('usuario_nombre')).getText();
  fecha_inicio_text = element(by.id('fecha_inicio_text')).getText();
  fecha_fin_text = element(by.id('fecha_fin_text')).getText();
    
    
  expect(nombre).toEqual('Viaje Protractor');
  expect(usuario).toEqual('Usuario: protractor');
  expect(fecha_inicio_text).toEqual('Fecha inicio: Saturday, June 20, 2015');
  expect(fecha_fin_text).toEqual('Fecha fin   : Tuesday, June 30, 2015');

  expect(ciudades.count()).toEqual(1);


  browser.sleep(2000);
  element(by.id('ciudad_href')).click();

  var puntos = element.all(by.repeater('punto in ciudad.puntosDeInteres'));

  nombre_ciudad = element(by.id('nombre_ciudad')).getText();
  expect(nombre_ciudad).toEqual('Buenos Aires, CABA, Argentina');

  expect(puntos.count()).toEqual(1);

  element(by.id('desloguearse')).click();


   


  });





  browser.sleep(2000);
}); 
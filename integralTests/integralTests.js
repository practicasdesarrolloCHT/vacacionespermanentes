var mongoose = require('mongoose');

//conectarse a una base nueva
mongoose.connect('mongodb://localhost/test');

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

    browser.get('http://localhost:3000/#/register');
    element(by.model('user.username')).sendKeys("protractor");
  	element(by.model('user.password')).sendKeys("protractor");

  	element(by.id('submitReg')).click();

    listaViajes = element.all(by.repeater('viaje in viajes'));
  });

  it('testeado la aplicación completa', function() {
  	expect(listaViajes.count()).toEqual(0);

  	element(by.id('crearViaje')).click();

  	element(by.model('nombre')).sendKeys("Viaje Protractor");
  	element(by.model('fecha_inicio')).sendKeys("20.06.2015");
  	element(by.model('fecha_fin')).sendKeys("30.06.2015");

  	element(by.id('submitCreateViaje')).click();
    
    expect(listaViajes.count()).toEqual(1);

    var nombresDeViajes = element.all(by.repeater('viaje in viajes').column('viaje.nombre')).map(function (elem) {
      return elem.getText();
    });

    var fechasDeInicioDeViajes = element.all(by.repeater('viaje in viajes').column('viaje.fecha_inicio')).map(function (elem) {
      return elem.getText();
    });

    fechasDeInicioDeViajes.then(function (textArr) {
      expect(textArr[0]).toEqual("Saturday, June 20, 2015"); // 20.06.2015 full date
    });
    //listaViajes = element.all(by.repeater('viaje in viajes'));

    //console.log("viajeeeeee " + firstViaje.toString());
    
    //currentViaje = element(By.binding("{{viaje.nombre}}"));
    //expect(listaViajes.count()).toEqual(1);

    //var show = element(by.binding('viaje.nombre'));
    //console.log("sdasdasdasd " + currentViaje.getText());
    //console.log("sdasdasdasd " + viajes.first().nombre);
    //expect(show.getText()).toEqual("Viaje Protractor");
    //expect(viajes.get(0).toContains("Viaje Protractor");
    //expect(viajes[0].usuario).toEqual("protractor");
    //expect(viajes[0].fecha_inicio).toEqual("20.06.2015");
    //expect(viajes[0].fecha_fin).toEqual("30.06.2015");    

  	browser.sleep(2000);
  });

  //  element(by.id('gobutton')).click();
  //it('título', function() {
  //  expect(browser.getTitle()).toEqual('Vacaciones permanentes');
  //});
  //
  //it('debería mostrar la lista con un viaje', function() {
  //  expect(viajes.count()).toEqual(1);
  //});
}); 
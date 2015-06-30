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

    browser.get('http://localhost:3000/#/register');
    element(by.model('user.username')).sendKeys("protractor");
  	element(by.model('user.password')).sendKeys("protractor");

  	element(by.id('submitReg')).click();
    listaViajes = element.all(by.repeater('viaje in viajes'));

  });

  it('Testear que cuando se crea un usuario pueda loggearse luego con su misma contraseña y poder ver su lista de viajes', function() {
    
    element(by.id('desloguearse')).click();

    browser.get('http://localhost:3000/#/login');
    element(by.id('loguearse')).click();



    element(by.model('user.username')).sendKeys("protractor");
    element(by.model('user.password')).sendKeys("protractor");

    element(by.id('submitLog')).click();

    expect(listaViajes.count()).toEqual(0);

    element(by.id('desloguearse')).click();

      	
    });

  it('Testear que cuando se crea un usuario no pueda loggearse luego con su otra contraseña', function() {
    
    element(by.id('desloguearse')).click();

    browser.get('http://localhost:3000/#/login');
    element(by.id('loguearse')).click();


    element(by.model('user.username')).sendKeys("protractor");
    element(by.model('user.password')).sendKeys("otracontraseña");

     element(by.id('submitLog')).click();

    //element(by.id('desloguearse')).click();

    error_panel =  element(by.id('error_panel'))
    expect(error_panel.getText()).toContain('Incorrect password.');



        
    });
   

  	browser.sleep(2000);
  });

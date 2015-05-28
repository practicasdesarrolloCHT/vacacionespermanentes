//mongod --config c:\mongodb\mongo.config
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});





// ------------------------------ Ciudades

//var Ciudad = mongoose.model('Ciudad');

//router.param('ciudad', function(req, res, next, id) {
  //var query = Ciudad.findById(id);

  //query.exec(function (err, ciudad){
    //if (err) { return next(err); }
    //if (!ciudad) { return next(new Error('can\'t find ciudad')); }

    //req.ciudad = ciudad;
    //return next();
  //});
//});


// -------------------------------------------------------

var Viaje = mongoose.model('Viaje');

router.param('viaje', function(req, res, next, id) {
  var query = Viaje.findById(id);

  query.exec(function (err, viaje){
    if (err) { return next(err); }
    if (!viaje) { return next(new Error('El viaje no esta')); }

    req.viaje = viaje;
    return next();
  });
});

router.get('/viajes', auth, function(req, res, next) {
  Viaje.find({usuario: req.payload.username},function(err, viajes){
    if(err){ return next(err); }

    res.json(viajes);
  });
});

var checkearPermisos = function(req,res, next) {
  //if (req.viaje.user.id != req.user.id) {
  //  return res.status(500).json("No es tuyo !!")
 // }
  return next();
}

router.delete('/viajes/:viaje', auth, checkearPermisos, function(req, res) {
  var viaje = req.viaje

  viaje.remove(function(err){
    if(err){ return next(err); }

    res.json('');
  });
});
var a = function(req, res) {
  res.json(req.viaje);
}
router.get('/viajes/:viaje', a);

router.put('/viajes/:viaje', auth, function(req, res, next){
  var viaje = req.viaje

  viaje.ciudades = req.body.ciudades;

  viaje.save(function(err, viaje){
    if(err){ return next(err); }

    res.json(viaje);
  });
});

router.post('/createViaje', auth, function(req, res, next) {
  var viaje = new Viaje(req.body);
  viaje.usuario = req.payload.username;
  viaje.save(function(err, viaje){
    if(err){ return next(err); }

    res.json(viaje);
  });
});

// ------------------------------- ENTREGA 1 -------------------------------------------


router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

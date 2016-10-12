var express = require('express');
var router = express.Router();
var app = express();
var models  = require('../models');
// var Umzug = require('umzug');
// var umzug = new Umzug({});

// var burger = require('../models/burger.js');
// var bodyParser = require("body-parser");
// var methodOverride = require("method-override");

  var Item = require("../models")["Item"]
  Item.sync();

  var Store = require("../models")["Store"]
  Store.sync();


//   router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });
// umzug.up().then(function (migrations) {
//   // "migrations" will be an Array with the names of the 
//   // executed migrations. 
// });

  router.use(function(req, res, next) {

      // log each request to the console
      console.log("router.use method and url: " + req.method, req.url);
      console.log("router.use store name: " + req.body.store_name);

      // continue doing what we were doing and go to the route
      next(); 
  });

  router.get('/', function(req, res) {
      // res.send('testing');  
      res.redirect('/items');
  });

//   router.get('/StoreItems', function(req, res) {
//       console.log("get StoreItems");
//       res.redirect('/items');
//   });

// router.get('/store', function(req, res) {
//       console.log("get store"); 
//       res.redirect('/items');
//   });
  
  router.get('/items', function (req, res) {
    Item.findAll({
    }).then(function(result) {
      console.log("router.get '/items/*******************");
      res.render('index', {
        result:result,
      });
    })
  });

//post route -> back to index
router.post('/items/create', function (req, res) {
  Item.create({item_name: req.body.item_name, bought: req.body.bought, id: req.body.id}).
  then(function() {
    console.log("XXXXXXX****this is the ITEM name: " + req.body.item_name);
     res.redirect('/items'); 
  });
});


router.put('/items/update/:id', function (req, res) {
  //include: [ Store ]
  Item.find({
    where: {
      id: req.params.id
    }
  }).

  then(function(bought) {
    if(bought){
      bought.updateAttributes({
        store_name: req.body.store_name,
        id: req.body.id,
        bought: req.body.bought
      })
    }
  }).
  then(function(store) {
    Store.sync().then(function(){
      Store.count({
        where: {
          store_name: req.body.store_name
        }
      }).then(function(count){
        // if (req.body.bought == 1) {
        //   console.log("change column only")
        // }
        if (count != 0) {
          console.log("** store name exists: " + req.body.store_name + " **");
 res.render(req.body.store_name)
     console.log("QQQQQQQQQQ Q Q Q Q =" + req.body.store_name)
        }
        if (count == 0) {
           Store.create({store_name: req.body.store_name, id: req.body.id, include:[Item]}).
  then(function(store) {
        console.log("** NEW store name: " + req.body.store_name + " **");
         res.render(req.body.store_name)
     console.log("YYYYYY Y Y Y  Y  =" + store)
        })
        }
      })
    })
    
  })
  res.redirect('/items');
});

router.put('/StoreItems', function (req, res) {
  include: [ Store, Item ]
  
  Store.find({
    where: {
      id: req.params.id
    }
  }).then(function(b) {
    if(b){
      b.updateAttributes({
        store_id: req.body.store_id,
        item_id: req.body.item_id,
      }).then(function(b) {
        console.log("** storeitem name: " + req.body.store_name + " **");
      });
    }
    
  });
  res.redirect('/items');
});

router.delete('/items/delete/:id', function (req, res) {
  Item.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {

    res.redirect('/items');
  });
});

module.exports = router;
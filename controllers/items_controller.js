var express = require('express');
var router = express.Router();
var app = express();

var Item = require("../models")["Item"]
Item.sync();
var Store = require("../models")["Store"]
Store.sync();


router.use(function(req, res, next) {

    // log each request to the console
    console.log("router.use method and url: " + req.method, req.url);
    console.log("router.use store name: " + req.body.store_name);
    next(); 
});
//direct to items page
router.get('/', function(req, res) {
    res.redirect('/items');
});
//populate items page
router.get('/items', function (req, res) {
  Item.findAll({
  }).then(function(result) {
    console.log("router.get '/items/*******************");
    res.render('index', {
      result:result,
    });
  })
});

//post route to create items, show them on the left side of the page and add them to the database
router.post('/items/create', function (req, res) {
  Item.create({item_name: req.body.item_name, bought: req.body.bought, id: req.body.id}).
  then(function() {
    console.log("XXXXXXX****this is the ITEM name: " + req.body.item_name);
     res.redirect('/items'); 
  });
});
// put route to update items when marked as purchased, 
// moves the item to the right sideof the screen, the enter store name field disappears 
// and add store names to store database if not already there
router.put('/items/update/:id', function (req, res) {
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
    //discovered many things that do not work to get store name to render when 
    //item moves to the right side.

 //  }).
 //  then(function(store) {
 //    Store.sync().then(function(){
 //      Store.find({
 //        where: {
 //          store_name: req.body.store_name
 //        }
 //        }).then(function(store) {
 //           res.render({
 //      store:store,
 //    });
 //          return res.render(Store)
 //      })
      
 // res.render(toJSON(req.body.store_name));
 //      Store.count({
 //        where: {
 //          store_name: req.body.store_name
 //        }

  }).then(function(count){
    if (count != 0) {
      console.log("------** store name exists: " + req.body.store_name + " **");
    }
    if (count == 0 && req.body.store_name != null) {
       Store.create({store_name: req.body.store_name, id: req.body.id, include:[Item]}).
        then(function(store) {
        return this.getDataValue(req.body.store_name);
        console.log("-------** NEW store name: " + req.body.store_name + " **");
      }).then(function() {
        Item.hasOne(Store, {foreignKey: 'store_name'})

      })
    }
  })
    // })   
  // })
  res.redirect('/items');
});
//update StoreItems database- also not working
router.put('/StoreItems', function (req, res) {
  include: [ Store, Item ]
  
  Store.find({
    where: {
      id: req.params.id
    }
  }).then(function(show) {
    if(show){
      b.updateAttributes({
        store_id: req.body.store_id,
        item_id: req.body.item_id,
      }).then(function(show) {
        console.log("** storeitem name: " + req.body.store_name + " **");
      });
    }
  });
  res.redirect('/items');
});
//deletes items when delete button pushed- deletes item from item table, 
//does not delete store from store table
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
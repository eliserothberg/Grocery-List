var express = require('express');
var router = express.Router();
var app = express();
// var burger = require('../models/burger.js');
// var bodyParser = require("body-parser");
// var methodOverride = require("method-override");

  var Item = require("../models")["Item"]
  Item.sync();

//   router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

  router.use(function(req, res, next) {

      // log each request to the console
      console.log(req.method, req.url);

      // continue doing what we were doing and go to the route
      next(); 
  });

  router.get('/', function(req, res) {
      // res.send('testing');  
      res.redirect('/items');
  });

  
  router.get('/items', function (req, res) {
    Item.findAll({
    }).then(function(result) {
    console.log("*******************");
    res.render('index', {result});
    })
  });

//post route -> back to index
router.post('/items/create', function (req, res) {
  Item.create({item_name: req.body.item_name, bought: req.body.bought, id: req.body.id}).
  then(function() {
    console.log(req.body.item_name);
     res.redirect('/items');
    
  });
});

// Burger.create({burger_name: req.body.burger_name, devoured: req.body.devoured}).
//   then(function(lowID) {
//     if(lowID){
//       var newID = req.body.length + 1;
//       lowID.updateAttributes({
//         id: newID
//       }).then(function(newID) {
//         console.log("this is the ID: " + req.body.id);
//         res.redirect('/burgers');
//       });
//     }
router.put('/items/update/:id', function (req, res) {
  Item.find({
    where: {
      id: req.params.id
    }
  }).then(function(b) {
    if(b){
      b.updateAttributes({
        bought: req.body.bought,
      }).then(function(b) {
        res.redirect('/items');
      });
    }
  });
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

// <!--IF THE STORE FIELD IS FILLED, CREATE ID FOR STORE AND GROUP ACCORDINGLY-->

// Burger.afterDestroy(function(burgers, options) {
//   ({truncate: true, cascade: false})
// });


    // .then(() => {
    //   res.json({ status: true });
    // }, (err) => {
    //   console.log('truncate: ', err);
    //   res.json(err);
    // });
// app.use('/', router);
module.exports = router;

 // Burger.destroy({truncate: true, cascade: false})
 //    .then(() => {
 //      res.json({ status: true });
 //    }, (err) => {
 //      console.log('truncate: ', err);
 //      res.json(err);
 //    });

//  
// Burger.findOrCreate({where: {burger_name: 'Cheeseburger'}, defaults: {devoured: false}})
//   .spread(function(burger, created) {
//     console.log(burger.get({
//       plain: true
//     }))
//     console.log(created)
//   })
    //  var hbsObject = {burger_name, devoured}
    // res.redirect('/burgers');
    // console.log(hbsObject);
    // res.render('index', hbsObject);
    // Burger.findAll().then(function(result) {

    // // console.log(hbsObject);
    // // res.render('index', hbsObject);
  

    //   res.json(result);
    //   console.log("this is the route to /burgers");
    // });

 

  //   router.get('/burgers', function(req, res) {
  //     if(req.params.burger){
  //     console.log("foo b_c");

  //       Burger.findAll().then(function(burger) {
  //         where: {
  //           burger_name: 'Cheeseburger'
  //         }
  //       }).then(function(result) {
  //         res.json(result);
  //         console.log("burgers api");
  //       });
  //     }
  //     else {
  //       Burger.findAll({})
  //       .then(function(result) {
  //         return res.json(result);
  //       console.log(result);
  //     })
  //   };
  // });

  // router.post('/api/new', function(req, res){
  //   var burger = req.body;
  //   Burger.create(burger).then(function(result){
  //       res.json(result);
  //   });
  // })


// Burger.findAll({
// }).then(function(burger) {
//   console.log("findAll");
// //   Project.findOne({
// //   where: {title: 'aProject'},
// //   attributes: ['id', ['name', 'title']]
// // }).then(function(project) {
//   // project will be the first entry of the Projects table with the title 'aProject' || null
//   // project.title will contain the name of the project
// })
// Burger
//   .findOrCreate({where: {burger_name: 'Cheeseburger'}, defaults: {devoured: false}})
//   .spread(function(burger, created) {
//     console.log(burger.get({
//       plain: true
//     }))
//     console.log(created)
//   })
// router.post('/burgers/create', function (req, res) {
//   burger.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], function () {
//     res.redirect('/burgers');
//   });
// });

// router.put('/burgers/update/:id', function (req, res) {
//   var condition = 'id = ' + req.params.id;

//   console.log('condition', condition);

//   burger.update({ devoured: req.body.devoured }, condition, function () {
//     res.redirect('/burgers');
//   });
// });

// router.delete('/burgers/delete/:id', function (req, res) {
//   var condition = 'id = ' + req.params.id;

//   burger.delete(condition, function () {
//     res.redirect('/burgers');
//   });
// });

// module.exports = router;

// 

// }

// sequelize.query('SELECT * FROM burgers', { model: Burger }).then(function(burger){
//   // Each record will now be a instance of Project
//   console.log("bar");
// })

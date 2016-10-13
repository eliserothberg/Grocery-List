
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var models  = require('./models');
var sequelizeConnection = models.sequelize

//JAWSDB connection
var Sequelize = require('sequelize'),
  connection;
if (process.env.JAWSDB_URL) {
}
else {
  connection = new Sequelize('items', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306'
  })
}
//allows foreign keys
sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')

// make tables
.then(function(){
  return sequelizeConnection.sync()
})
.then(function(){
  return models.Item.sync()
})
.then(function(){
  return models.Store.sync();
})
.then(function(){
  return models.StoreItem.sync()
})

var app = express();

app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');

//allows helpers I haven't figured out yet
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    toJSON : function(object) {
      return JSON.stringify(object);
    }
  }
}));

app.set('view engine', 'handlebars');

var routes = require('./controllers/items_controller.js');
app.use('/', routes);


var port = process.env.PORT || 3000;
app.listen(port);

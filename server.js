
var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var methodOverride = require('method-override');
var router = express.Router();
var models  = require('./models');
var sequelizeConnection = models.sequelize

sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')

// make our tables
// note: force:true drops the table if it already exists
.then(function(){
  return sequelizeConnection.sync()
})

var Item = require("./models")["Item"]
Item.sync();


var app = express();

app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

var routes = require('./controllers/items_controller.js');
app.use('/', routes);
// app.use('/burger', routes);
// app.use('/update', routes);
// app.use('/create', routes);

//be in the correct format for express to use

var port = process.env.PORT || 3000;
app.listen(port);

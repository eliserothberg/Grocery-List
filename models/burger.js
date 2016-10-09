'use strict';
module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define('Burger', {
    routeName: DataTypes.STRING,
    burger_name: DataTypes.STRING,
    devoured: DataTypes.BOOLEAN,
    date: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(models) {
        //can call models in here
        //ie:
        // Burger.hasOne(models.Customer);
        //create a Customer model with name, burger_name, devoured?? so do a join like Customer.hasMany(models.Buger)??
         //or Customer.hasOne(models.foreign_key(id));
        // associations can be defined here
      }
    }
  });
  return Burger;
};
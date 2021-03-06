'use strict';
//create store model
module.exports = function(sequelize, DataTypes) {
  var Store = sequelize.define('Store', {
    store_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Store.belongsToMany(models.Item, {through: models.StoreItem});
      }
    }
  });
  return Store;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var Store = sequelize.define('Store', {
    store_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Store.belongsToMany(models.Item, {through: models.StoreItem});
        // associations can be defined here
      }
    }
  });
  return Store;
};
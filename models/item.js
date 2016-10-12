'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    item_name: DataTypes.STRING,
    bought: DataTypes.BOOLEAN,
    date: DataTypes.DATEONLY
  }, {
    classMethods: {
      associate: function(models) {
        // Item.hasOne(models.Store, {through: models.StoreItem});
        Item.belongsToMany(models.Store, {through: models.StoreItem});

      }
    }
  });
  return Item;
};
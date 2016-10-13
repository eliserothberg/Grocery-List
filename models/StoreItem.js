//create StoreItem model

module.exports = function(sequelize, DataTypes){
  var StoreItem = sequelize.define('StoreItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
      }
    }, {
    classMethods:{
      // no associations here,
      associate: function(models) {
        // none whatsoever
      }
    }

  })

  return StoreItem;
};
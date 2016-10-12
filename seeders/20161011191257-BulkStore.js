'use strict';


var Store = require('../models')["Store"];


module.exports = {
  up: function (queryInterface, Sequelize) {
    return Store.bulkInsert([
      {store_name: "Whole Foods"},
      {store_name: "Sprouts"},
      {store_name: "Trader Joes"},
      {store_name: "Gelsons"},
      {store_name: "Vons"}
    ])
  },

  down: function (queryInterface, Sequelize) {
    return Store.destroy({where:{store_name: [
        "Whole Foods",
        "Sprouts",
        "Trader Joes",
        "Gelsons",
        "Vons"
    ]}})
  }
}
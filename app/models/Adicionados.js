'use strict';
const models = require('../models')
module.exports = function(sequelize, Sequelize) {

  const Adicionados = sequelize.define('Adicionados', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    UserId1: {
      type: Sequelize.INTEGER,
      references: {
        model: models.User,
        key: 'id',
        as:'idOne'
      }
    },
    UserId2: {
      type: Sequelize.INTEGER,
      references: {
        model: models.User, // 'Actors' would also work
        key: 'id',
        as:'idTwo'
      }
    }
  });

  Adicionados.associate = function(models) {
    models.User.belongsToMany(models.User,{through:'Adicionados', foreignKey:'UserId1',as:'UserId1'});
    models.User.belongsToMany(models.User,{through:'Adicionados', foreignKey:'UserId2',as:'UserId2'});
  };

  return Adicionados;
}

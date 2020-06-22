'use strict';
const models = require('../models')
module.exports = function(sequelize, Sequelize) {

  const UsuariosPertenceGrupo = sequelize.define('UsuariosPertenceGrupo', {
    UserId: {
      type: Sequelize.INTEGER,
      references: {
        model: models.User,
        key: 'id'
      }
    },
    GrupoId: {
      type: Sequelize.INTEGER,
      references: {
        model: models.Grupo, // 'Actors' would also work
        key: 'id'
      }
    }
  });

  UsuariosPertenceGrupo.associate = function(models) {
    models.User.belongsToMany(models.Grupo,{through:'UsuariosPertenceGrupo'})
  };

  UsuariosPertenceGrupo.associate = function(models) {
    models.Grupo.belongsToMany(models.User,{through:'UsuariosPertenceGrupo'})
  };

  return UsuariosPertenceGrupo;
}

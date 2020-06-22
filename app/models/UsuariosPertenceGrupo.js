'use strict';
const models = require('../models')
module.exports = function(sequelize, Sequelize) {

  const UsuariosPertenceGrupo = sequelize.define('UsuariosPertenceGrupo', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
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
    models.User.belongsToMany(models.Grupo,{through:'UsuariosPertenceGrupo'});
    models.Grupo.belongsToMany(models.User,{through:'UsuariosPertenceGrupo'});
    UsuariosPertenceGrupo.hasMany(models.Postagem)
  };

  return UsuariosPertenceGrupo;
}

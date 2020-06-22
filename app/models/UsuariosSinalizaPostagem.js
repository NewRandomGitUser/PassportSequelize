'use strict';
const models = require('../models')
module.exports = function(sequelize, Sequelize) {

  const UsuariosSinalizaPostagem = sequelize.define('UsuariosSinalizaPostagem', {
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
    PostagemId: {
      type: Sequelize.INTEGER,
      references: {
        model: models.Postagem, // 'Actors' would also work
        key: 'id'
      }
    }
  });

  UsuariosSinalizaPostagem.associate = function(models) {
    models.User.belongsToMany(models.Postagem,{through:'UsuariosSinalizaPostagem'});
    models.Postagem.belongsToMany(models.User,{through:'UsuariosSinalizaPostagem'});
    models.UsuariosSinalizaPostagem.hasOne(models.AcoesEmCurso,{
      foreignKey: {
        allowNull: true
      }
    });
  };

  return UsuariosSinalizaPostagem;
}

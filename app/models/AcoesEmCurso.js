'use strict';
const models = require('../models')
module.exports = function(sequelize, Sequelize) {
  var AcoesEmCurso = sequelize.define('AcoesEmCurso',
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    Inicio: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    Status: {
      type: Sequelize.STRING,
      notEmpty: true
    },

    UsuariosSinalizaPostagemId:{
      type: Sequelize.INTEGER,
      references:{
        model:'UsuariosSinalizaPostagems',
        key:'id',
        unique: true
      }
    }
  });

  AcoesEmCurso.associate = function (models) {
    models.AcoesEmCurso.belongsTo(models.UsuariosSinalizaPostagem);
  };


  return AcoesEmCurso;
}

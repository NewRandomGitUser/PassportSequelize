const models = require('../models')
module.exports = function(sequelize, Sequelize) {

    var Postagem = sequelize.define('Postagem', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        conteudo: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        UsuariosPertenceGrupoId:{
          type: Sequelize.INTEGER,
          references:{
            model:'UsuariosPertenceGrupos',
            key:'id',
          }
        }

      });

        //Postagems N - 1 Usuario: Cada Postagem é feito por um usuário
        Postagem.associate = function (models) {
        Postagem.belongsTo(models.UsuariosPertenceGrupo);
      };
      return Postagem;
}

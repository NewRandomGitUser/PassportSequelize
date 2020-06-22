'use strict';
module.exports = function(sequelize, Sequelize) {
    var Grupo = sequelize.define('Grupo', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        grupoNome: {
            type: Sequelize.STRING,
            notEmpty: true
        },
    });

    Grupo.associate = function (models) {
    models.Grupo.belongsTo(models.User,{
      foreignKey: {
        name: 'moderadorUser',
        allowNull: false,
      }
    });
  };

    return Grupo;

}

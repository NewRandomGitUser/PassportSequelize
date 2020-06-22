'use strict';
module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('User', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },

        username: {
            type: Sequelize.TEXT
        },

        about: {
            type: Sequelize.TEXT
        },

        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },

        last_login: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }


    });

    //Usuario 1 - N Posts: Usuario faz posts, cada post é feito por um usuário
    User.associate = function(models) {
      User.hasMany(models.Post)
    };

    //Usuario 1 - N Grupos: Usuario modera grupos, cada grupo é moderado por um usuário
    User.associate = function(models) {
      User.hasMany(models.Grupo)
    };




    return User;

}

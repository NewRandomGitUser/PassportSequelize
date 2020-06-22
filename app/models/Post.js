module.exports = function(sequelize, Sequelize) {

    var Post = sequelize.define('Post', {

        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },

        conteudo: {
            type: Sequelize.STRING,
            notEmpty: true
        },
      });

        //Posts N - 1 Usuario: Cada Post é feito por um usuário
        Post.associate = function (models) {
        models.Post.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      };
      return Post;
}

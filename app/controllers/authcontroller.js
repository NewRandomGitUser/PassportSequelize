var models = require("../models");

//Operacoes básicas do usuário
  exports.register = function(req, res)
  {
    res.render('usuarios/register');
  }

  exports.login = function(req, res)
  {
    res.render('usuarios/login');
  }

  exports.logout = function(req, res)
  {
    req.session.destroy(function(err)
    {
        res.redirect('/');
    });
  }

  exports.grupoProfile = function(req, res)
  {
        res.render('grupos/grupoProfile');

  }


  exports.home = async function(req, res)
  {
    const conteudoPosts = await models.Post.findAll(
    {where:{UserId:req.user.id}});
    res.render('usuarios/home',
      {
        nome:req.user,
        postagem:conteudoPosts
      }
    )
  }


//Operacoes básicas do usuário
  exports.addPostagem = function(req, res)
  {
    const novaPostagem = {
      conteudo: req.body.conteudo,
      UserId: req.user.id,
    }
    new models.Post(novaPostagem).save().then(() =>{
      // req.flash("success_msg","Postagem criada com sucesso!")
      res.redirect("/home")
    }).catch((err)=>{
      // req.flash("error_msg","Houve um erro durante o salvamento da postagem")
      res.redirect("/")
    })
  }

  exports.perfil = async function(req, res)
  {
    res.render('usuarios/perfil',{nome:req.user})
  }


  exports.Grupos = async function(req, res)
  {
    const gruposDoUsuario = await models.Grupo.findAll({
      where:{UserId:req.user.id},
      attributes: ['grupoNome'],
      include:[{
        model:models.User,
        through: {attributes: []}
      }]})


      console.log(gruposDoUsuario[0].grupoNome)

      const grupos = gruposDoUsuario[0].grupoNome

      res.render('usuarios/Grupos',
      {
        grupos:gruposDoUsuario
      })

  }

  exports.PostagensDoGrupoDeRisco = function(req, res)
  {
    res.render('postagens/PostsDoGrupoDeRisco');
  }


  exports.CriarGrupo = function(req, res)
  {
    res.render('grupos/criarGrupo');

  }


    exports.BotaoCriarGrupo = async function(req, res){
      console.log("descricao:"+req.body.descricao+" nome_do_grupo:"+req.body.nome_do_grupo+" "+req.user.firstname)
      const novoGrupo = {
        grupoNome: req.body.nome_do_grupo,
        UserId: req.user.id,
      }
      new models.Grupo(novoGrupo).save().then(() =>{
        console.log('show')
        // res.redirect("/grupos")

      }).catch((err)=>{
        // req.flash("error_msg","Houve um erro durante o salvamento da postagem")
        console.log("eu vim pro segundo catch "+err)
        // res.redirect("/")
      })

      const grupoRecemCriado = await models.Grupo.findAll(
        {
          limit:1,
          order: [ [ 'createdAt', 'DESC' ]]
        });

        console.log("grupo recem criado:"+grupoRecemCriado)
        const novoUsuarioDoGrupo = {
          GrupoId: grupoRecemCriado.id,
          UserId: req.user.id,
        }

        new models.UsuariosPertenceGrupo(novoUsuarioDoGrupo).save().then(() =>{
          // req.flash("success_msg","Postagem criada com sucesso!")
          res.redirect("/grupos")

        }).catch((err)=>{
          // req.flash("error_msg","Houve um  erro durante o salvamento da postagem")
          console.log(err)
          res.redirect("/")
        })



    }

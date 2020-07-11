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

  exports.grupoProfile = async function(req, res)
  {

    const Grupo = await models.Grupo.findOne({
    where:{grupoNome:req.params.nomeGrupo}}).then((Grupo)=>{
          console.log(Grupo.id+" "+Grupo.grupoNome)
          res.render('grupos/grupoProfile',{grupo:Grupo});
    }).catch((err)=>{
      console.log(err)

      res.redirect('/grupos')
    });

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
    console.log('grupo: '+req.params.grupo)
    res.render('usuarios/perfil',{nome:req.user,grupo:req.params.grupo})
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
      // console.log(gruposDoUsuario[0].grupoNome)
      // const grupos = gruposDoUsuario[0].grupoNome
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


  exports.BotaoCriarGrupo =  async function(req, res, next){
    console.log("descricao:"+req.body.descricao+" nome_do_grupo:"+req.body.nome_do_grupo+" "+req.user.firstname)
    const novoGrupo = {
      grupoNome: req.body.nome_do_grupo,
      UserId: req.user.id,
    }
     new models.Grupo(novoGrupo).save().then(() =>{
      console.log('show')
    }).catch((err)=>{
      // req.flash("error_msg","Houve um erro durante o salvamento da postagem")
      console.log("eu vim pro segundo catch "+err)
      // res.redirect("/")
    })
      next()
    }

    exports.InserirModerador = function(req,res,next){
      const grupoRecemCriado =  models.Grupo.findAll({
        where:{UserId:req.user.id},
        order: [ [ 'createdAt', 'DESC' ]],
        include:[{
          model:models.User,
          through: {attributes: []}
        }],
        limit:1,
      })
      console.log(grupoRecemCriado)
      console.log("grupo recem criado inserir moderador :"+grupoRecemCriado[0].grupoNome)
      const novoUsuarioDoGrupo = {
        GrupoId: grupoRecemCriado[0].id,
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



      exports.NovaPostagem = async function(req, res)
      {
        console.log("id:"+req.params.grupo)
        // console.log("req.params.nomeGrupo------------->"+req.params.nomeGrupo)
        const grupoDeInteresse = await models.Grupo.findOne({
          where:{id:req.params.grupo},
          include:[{
            model:models.User,
            through: {attributes: []}
          }],
        })



        console.log("Grupo------------------------------>>>>>>>>."+grupoDeInteresse.grupoNome)
        console.log(req.user.id)
        console.log(req.params.grupo)
        const UsuariosGrupo = await models.UsuariosPertenceGrupo.findOne({
          where:{UserId:req.user.id,GrupoId:Number(req.params.grupo)},
          // include:[{
          //   // model:models.User,
          //   // model:models.Grupo,
          //   through: {attributes: []},
          //
          // }],

        })

        console.log(UsuariosGrupo)



        const novaPostagem = {
          UsuariosPertenceGrupoId: UsuariosGrupo.id,
          conteudo: req.body.conteudo,
        }
        new models.Postagem(novaPostagem).save().then(() =>{
          console.log('show')
          res.redirect('/perfilGrupo/'+grupoDeInteresse.grupoNome)

          // res.redirect("/grupos")

        }).catch((err)=>{
          // req.flash("error_msg","Houve um erro durante o salvamento da postagem")
          console.log("eu vim pro segundo catch "+err)
          // res.redirect("/")
        })

      }


      exports.AcaoSinalizada = function(req, res)
      {
        res.render('acoes/AcoesSinalizadas');
      }

      exports.AcaoEmTransicao = function(req, res)
      {
        res.render('acoes/AcoesEmTransicao');
      }

      exports.AcaoConcluida = function(req, res)
      {
        res.render('acoes/AcoesConcluidas');
      }

      exports.NotaDaAcao = function(req, res)
      {
        res.render('acoes/NotaDaAcao');
      }

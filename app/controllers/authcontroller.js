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

  exports.home = async function(req, res)
  {
    const conteudoPosts = await models.Post.findAll(
      {where:{UserId:req.user.id}});
      res.render('usuarios/home',{nome:req.user,
        postagem:conteudoPosts})
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

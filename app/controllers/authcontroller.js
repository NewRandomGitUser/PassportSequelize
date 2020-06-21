var models = require("../models");


exports.register = function(req, res)
{
  res.render('register');
}

exports.login = function(req, res)
{
  res.render('login');
}

exports.dashboard = async function(req, res)
{
  const conteudoPosts = await models.Post.findAll(
  {where:{UserId:req.user.id}});
  res.render('dashboard',{nome:req.user,
                          postagem:conteudoPosts})
}

exports.logout = function(req, res)
{
  req.session.destroy(function(err)
  {
      res.redirect('/');
  });
}

exports.addPostagem = function(req, res)
{

  const novaPostagem = {
    conteudo: req.body.conteudo,
    UserId: req.user.id,
  }

  new models.Post(novaPostagem).save().then(() =>{
    // req.flash("success_msg","Postagem criada com sucesso!")
    res.redirect("/dashboard")
  }).catch((err)=>{
    // req.flash("error_msg","Houve um erro durante o salvamento da postagem")
    req.redirect("/")
  })

}

var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {
  app.get('/register', authController.register);
  app.get('/login', authController.login);
  app.post('/register', passport.authenticate('local-register', {
    successRedirect: '/home',
    failureRedirect: '/register'}));

  app.get('/home',isLoggedIn,authController.home);
  app.get('/logout',authController.logout);
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/home',
    failureRedirect: '/login'
  }));
  app.post('/addPostagem',isLoggedIn,authController.addPostagem);

  function isLoggedIn(req, res, next)
  {
      if (req.isAuthenticated())
          return next();
      res.redirect('/login');
  }

  app.get('/perfil',isLoggedIn,authController.grupoProfile);

  app.get('/grupos',isLoggedIn,authController.Grupos);
app.get('/postagens',isLoggedIn,authController.PostagensDoGrupoDeRisco);


}

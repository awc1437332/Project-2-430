const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // Login/Logout/Signup
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // Notes
  app.get('/getNotes', mid.requiresLogin, controllers.Note.getNotes);
  app.get('/note', mid.requiresLogin, controllers.Note.notePage);
  app.get('/note', mid.requiresLogin, controllers.Note.makeNote);

  // Default
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  // 404
  app.get('*', mid.requiresSecure, controllers.App.notFoundPage);
};

module.exports = router;

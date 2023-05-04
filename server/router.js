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
  app.get('/getNotesAZ', mid.requiresLogin, controllers.Note.getNotesAZ);
  app.get('/getNotesZA', mid.requiresLogin, controllers.Note.getNotesZA);

  app.get('/checkPremium', mid.requiresLogin, controllers.Account.checkPremium);
  app.get('/note', mid.requiresLogin, controllers.Note.notePage);
  app.post('/note', mid.requiresLogin, controllers.Note.makeNote);
  app.post('/deleteNote', mid.requiresLogin, controllers.Note.deleteNote);

  // Settings
  app.get('/accountSettings', mid.requiresLogin, controllers.Account.accountSettingsPage);
  app.post('/changeUser', mid.requiresLogin, controllers.Account.changeUser);
  app.post('/changePass', mid.requiresLogin, controllers.Account.changePass);

  // Default
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  // 404
  app.get('*', mid.requiresSecure, controllers.Account.notFoundPage);
};

module.exports = router;

const models = require('../models');

const { Account } = models;

// Handles the page renders
const loginPage = (req, res) => res.render('login');
const accountSettingsPage = (req, res) => res.render('settings');
const notFoundPage = (req, res) => res.render('notFound');

// Handles the login/logout/signup functions
const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/note' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;
  const premium = `${req.body.premium}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!" ' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    console.log('hash created');
    const newAccount = new Account({ username, password: hash, premium });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/note' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occurred' });
  }
};

// Check for premium account
const checkPremium = async (req, res) => {
  try {
    const premium = await Account.findOne({ username: req.session.account.username }).lean().exec();
    return res.status(200).json({ premium: premium.premium });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'We could not complete the premium check' });
  }
};

// Change user account information here
const changeUser = async (req, res) => {
  const newUsername = `${req.body.newUsername}`;
  const { username } = req.session.account;

  if (!newUsername) {
    return res.status(400).json({ error: 'You must fill in the new username field.' });
  }

  if (username === newUsername) {
    return res.status(400).json({ error: 'You are already using this Username!' });
  }

  try {
    const checkForExisting = await Account.findOne({ username: newUsername }).lean().exec();
    if (checkForExisting) {
      return res.status(400).json({ error: 'This username is already in use, please try again.' });
    }

    const currentUser = await Account.findOne({ username });
    currentUser.username = newUsername;
    await currentUser.save();

    req.session.account = Account.toAPI(currentUser);

    return res.status(201).json({ message: 'Username changed successfully' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred changing the username' });
  }
};

const changePass = async (req, res) => {
  const newPass1 = `${req.body.newPass1}`;
  const newPass2 = `${req.body.newPass2}`;

  if (!newPass1 || !newPass2) {
    return res.status(400).json({ error: 'All fields are required to change your password' });
  }

  if (newPass1 !== newPass2) {
    return res.status(400).json({ error: 'Your new passwords do not match' });
  }

  try {
    const currentUser = await Account.findOne({ username: req.session.account.username });

    currentUser.password = await Account.generateHash(newPass1);
    await currentUser.save();
    return res.status(201).json({ message: 'Your password has been changed!' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred changing the password' });
  }
};

module.exports = {
  loginPage,
  accountSettingsPage,
  notFoundPage,
  login,
  logout,
  signup,
  checkPremium,
  changeUser,
  changePass,
};

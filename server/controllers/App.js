const models = require('../models');

const { Account, Note } = models;

const notFoundPage = (req, res) => {
    res.render('notFound');
};



module.exports = {
    notFoundPage,
};
const models = require('../models');

const { Note } = models;

const notePage = (req, res) => {
    res.render('app');
};

const makeNote = async (req,res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({error: 'Both Note Title and Note Content are required.'});
    }

    const noteData = {
        title: req.body.title,
        content: req.body.content,
        owner: req.session.account._id,
    };

    try {
        const newNote = new Note(noteData);
        await newNote.save();
        return res.status(201).json({ title: newNote.title, content: newNote.content});
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Note already exists.'});
        }
        return res.status(500).json({error: 'An error occurred making your note.'});
    }
};

const getNotes = async (req, res) => {
    try {
        const query = { owner: req.session.account._id };
        const docs = await Note.find(query).select('title content').lean().exec();

        return res.json({notes: docs});
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieivng your notes.'});
    }
};

module.exports = {
    notePage,
    makeNote,
    getNotes,
};
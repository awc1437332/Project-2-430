const models = require('../models');

const { Note } = models;

// Renders the page
const notePage = (req, res) => {
    res.render('app');
};

// Make and Delete notes
const makeNote = async (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ error: 'Both Note Title and Note Content are required.' });
    }

    const noteData = {
        title: req.body.title,
        content: req.body.content,
        owner: req.session.account.username,
    };

    try {
        const newNote = new Note(noteData);
        await newNote.save();
        return res.status(201).json({ title: newNote.title, content: newNote.content, owner: newNote.owner });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Note already exists.' });
        }
        return res.status(500).json({ error: 'An error occurred making your note.' });
    }
};

const deleteNote = async (req, res) => {
    const title = `${req.body.title}`;

    if (!title) {
        return res.status(400).json({ error: "No note title was found to delete." });
    }

    try {
        await Note.deleteOne({ owner: req.session.account.username, title: title }).lean().exec();
        return res.status(200).json({ redirect: '/note' });
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: "error occurred during note deletion." });
    }
};

// Get Notes with assorted sorting functions
const getNotes = async (req, res) => {
    try {
        const query = { owner: req.session.account.username };
        const docs = await Note.find(query).lean().exec();

        return res.status(200).json({ notes: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieivng your notes.' });
    }
};

const getNotesAZ = async (req, res) => {
    try {
        const query = { owner: req.session.account.username };
        const docs = await Note.find(query).sort({title: 1}).lean().exec();

        return res.status(200).json({ notes: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieivng your notes.' });
    }
};

const getNotesZA = async (req, res) => {
    try {
        const query = { owner: req.session.account.username };
        const docs = await Note.find(query).sort({title: -1}).lean().exec();

        return res.status(200).json({ notes: docs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error retrieivng your notes.' });
    }
};

module.exports = {
    notePage,
    makeNote,
    deleteNote,
    getNotes,
    getNotesAZ,
    getNotesZA,
};
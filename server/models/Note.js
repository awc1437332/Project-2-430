const mongoose = require('mongoose');

let NoteModel = {};

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

NoteSchema.statics.toAPI = (doc) => ({
    title: doc.title,
    content: doc.content,
});

NoteModel = mongoose.model('Note', NoteSchema);
module.exports = NoteModel;
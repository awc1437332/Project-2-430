const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleNotes = (e) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector('#noteTitle').value;
    const content = e.target.querySelector('#noteContent').value;

    if (!title || !content) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { title, content }, loadNotes);

    return false;
};

const deleteNote = (e, noteTitle) => {
    e.preventDefault();
    helper.hideError();

    const title = noteTitle;

    if (!title) {
        helper.handleError('Note Title not found');
        return false;
    }

    console.log("You are about to delete a note");
    console.log(e.target.action)
    helper.sendPost(e.target.action, { title });

    return false;
}

const NoteForm = (props) => {
    return (
        <form id='noteForm'
            onSubmit={handleNotes}
            name='noteForm'
            action='/note'
            method='POST'
            className='box'>
            <div className="field">
                <label className='label' htmlFor='title'>What is the Title of your note? </label>
                <div className='control'>
                    <input className='input' id='noteTitle' type='text' name='title' placeholder='Note Title' />
                </div>
            </div>
            <div className="field">
                <label className='label' htmlFor='content'>What would you like to write on your note? </label>
                <div className='control'>
                    <input className='input' id='noteContent' type='text' name='content' />
                </div>
            </div>
            <button className='button is-link' type='submit' value='Attach Note to Fridge' >Attach Note to your Fridge!</button>
        </form>
    )
};

const PremiumNoteSorts = (props) => {
    return (
        <div id='sortingButtons'>
            <button id="AtoZ" className='button is-link'>Sort A to Z</button>
            <button id="ZtoA" className='button is-link'>Sort Z to A</button>
        </div>
    )
}

const NoteList = (props) => {
    if (props.notes.length === 0) {
        return (
            <div className='title'>
                <h3 className='m-3'>No Notes yet.</h3>
            </div>
        );
    }

    const notes = props.notes.map(note => {
        return (
            <form id={note._id}
                onSubmit={(e) => {
                    deleteNote(e, note.title);
                }}
                name='note'
                action='/deleteNote'
                method='POST'
                className='media'>
                <div className='media-content'>
                    <h3 className='title'>{note.title}</h3>
                    <p className='content'>{note.content}</p>
                </div>
                <div className='media-right'>
                    <button
                        className='delete'
                        type='submit'
                        value='Delete Note'
                    ></button>
                </div>
            </form>
        );
    });

    return (
        <section id='noteList' className='box'>
            {notes}
        </section>
    );
};

const loadNotes = async () => {
    const response = await fetch('/getNotes');
    const data = await response.json();
    ReactDOM.render(
        <NoteList notes={data.notes} />,
        document.getElementById('notes')
    );
};

const loadNotesAZ = async () => {
    const response = await fetch('/getNotesAZ');
    const data = await response.json();
    ReactDOM.render(
        <NoteList notes={data.notes} />,
        document.getElementById('notes')
    );
};

const loadNotesZA = async () => {
    const response = await fetch('/getNotesZA');
    const data = await response.json();
    ReactDOM.render(
        <NoteList notes={data.notes} />,
        document.getElementById('notes')
    );
};

const checkPremium = async () => {
    const response = await fetch('/checkPremium');
    const data = await response.json();
    if (data.premium) {
        ReactDOM.render(
            <PremiumNoteSorts />,
            document.getElementById('sorting')
        );
        console.log("your buttons are made.")
        return true;
    }
    return false;
};

const init = async () => {
    ReactDOM.render(
        <NoteForm />,
        document.getElementById('createNote')
    );

    console.log('checking premium');
    if(await checkPremium()) {
        const aToZBtn = document.getElementById('AtoZ');
        const zToABtn = document.getElementById('ZtoA');

        console.log(aToZBtn);
        console.log(zToABtn);

        aToZBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loadNotesAZ();
            return false;
        });

        zToABtn.addEventListener('click', (e) => {
            e.preventDefault();
            loadNotesZA();
            return false;
        });
    }

    ReactDOM.render(
        <NoteList notes={[]} />,
        document.getElementById('notes')
    );

    loadNotes();
};

window.onload = init;
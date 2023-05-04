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

const NoteList = (props) => {
    if (props.notes.length === 0) {
        return (
            <div className='title'>
                <h3 className='emptyNote'>No Notes yet.</h3>
            </div>
        );
    }

    const notes = props.notes.map(note => {
        return (
            <div key={note._id} className='media'>
                <div className='media-content'>
                    <h3 className='title'>{note.title}</h3>
                    <p className='content'>{note.content}</p>
                </div>
                <div className='media-right'>
                    <button className='delete'></button>
                </div>
            </div>
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

const init = () => {
    ReactDOM.render(
        <NoteForm />,
        document.getElementById('createNote')
    );

    ReactDOM.render(
        <NoteList notes={[]} />,
        document.getElementById('notes')
    );

    loadNotes();
};

window.onload = init;
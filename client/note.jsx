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

    helper.sendPost(e.target.action, {title, content}, loadNotes);

    return false;
};

const NoteForm = (props) => {
    return (
        <form id='noteForm'
        onSubmit={handleNotes}
        name='noteForm'
        action='/note'
        method='POST'
        className='noteForm'>
            <label htmlFor='title'>What is the Title of your note? </label>
            <input id='noteTitle' type='text' name='title'placeholder='Note Title'/>
            <label htmlFor='content'>What would you like to write on your note? </label>
            <input id='noteContent' type='text'name='content'/>
            <input className='noteSubmit' type='submit' value='Attach Note to Fridge'/>
        </form>
    )
};

const noteList = (props) => {
    if (props.notes.length === 0) {
        return (
            <div className='noteList'>
                <h3 className='emptyNote'>No Notes yet.</h3>
            </div>
        );
    }

    const noteNodes = props.notes.map(note => {
        return (
            <div key={note._id} className='note'>
                <h2 className='noteTitle'>{note.title}</h2>
                <h3 className='noteContent'>{note.content}</h3>
            </div>
        );
    });

    return (
        <div className='noteList'>
            {noteNodes}
        </div>
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
        <NoteForm/>,
        document.getElementById('makeNote')
    );

    ReactDOM.render(
        <NoteList notes={[]} />,
        document.getElementById('notes')
    );

    loadNotes();
};

window.onload = init;
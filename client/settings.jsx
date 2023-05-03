const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleUserChange = (e) => {
    e.preventDefault();
    helper.hideError();

    const newUsername = e.target.querySelector('#changeUser').value;

    if(!newUsername){
        helper.handleError('The username field should be filled out');
        return false;
    }

    helper.sendPost(e.target.action, {username});

    return false;
}

const handlePassChange = (e) => {
    e.preventDefault();
    helper.hideError();

    const oldPassword = e.target.querySelector('#oldPass').value;
    const newPass1 = e.target.querySelector('#newPass1').value;
    const newPass2 = e.target.querySelector('#newPass2').value;

    if(!oldPassword || !newPass1 || !newPass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if(oldPassword === newPass1) {
        helper.handleError('The Old and New Password cannot match!');
        return false;
    }

    if (newPass1 !== newPass2) {
        helper.handleError('The passwords must match!');
        return false;
    }

    helper.sendPost(e.target.action, {oldPassword, newPass1, newPass2});

    return false;
}

const ChangeUsernameWindow = (props) => {
    <form id="changeUser"
        name='changeUser'
        onSubmit={handleUserChange}
        action='/changeUser'
        method='POST'
        className='mainForm'>
        <h3 className='title'>Change Username Here</h3>

        <label htmlFor='changeUser'>New Username: </label>
        <input id='changeUser' type='text' name='changeUser' />
    </form>
}

const ChangePasswordWindow = (props) => {
    <form id="changePass"
        name='changePass'
        onSubmit={handlePassChange}
        action='/changePass'
        method='POST'
        className='mainForm'>
        <h3 className='title'>Change Password Here</h3>

        <label htmlFor='oldPass'>Old Password: </label>
        <input id='oldPass' type='text' name='oldPass' />

        <label htmlFor='newPass1'>New Password: </label>
        <input id='newPass1' type='text' name='newPass1' />

        <label htmlFor='newPass2'>Re-type New Password: </label>
        <input id='newPass2' type='text' name='newPass2' />
    </form>
}

const init = () => {
    const changeUserBtn = document.getElementById('changeUserBtn');
    const changePassBtn = document.getElementById('changePassBtn');

    changeUserBtn.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<ChangeUsernameWindow />,
            document.getElementById('editintForm'));
        return false;
    });

    changePassBtn.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<ChangePasswordWindow />,
        document.getElementById('editingForm'));
        return false;
    });
}

window.onload = init;
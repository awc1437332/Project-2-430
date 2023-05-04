const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

// Handler functions for login and signup
const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass });

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const premium = e.target.querySelector('#premiumCheck').checked;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, pass2, premium });

    return false;
};

// Handler functions for the login and signup windows
const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="box has-shadow"
        >
            <div className="field">
                <label className='label' htmlFor="username">Username: </label>
                <div className="control">
                    <input className='input' id="user" type="text" name="username" placeholder="username" />
                </div>
            </div>
            <div className="field">
                <label className='label' htmlFor="pass">Password: </label>
                <div className="control">
                    <input className='input' id="pass" type="password" name="pass" placeholder="password" />
                </div>
            </div>
            <button className="button is-link" type="submit" value="Log in">Log In</button>
        </form>
    )
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="box has-shadow"
        >
            <div className="field">
                <label className='label' htmlFor="username">Username: </label>
                <div className="control"><input className="input" id="user" type="text" name="username" placeholder='username' /></div>
            </div>
            <field>
                <label className='label' htmlFor='pass'>Password: </label>
                <div className="control"><input className="input" id='pass' type='password' name='pass' placeholder='password' /></div>
            </field>
            <div className="field">
                <label className='label' htmlFor='pass'>Password: </label>
                <div className="control"><input className="input" id='pass2' type='password' name='pass2' placeholder='retype password' /></div>
            </div>
            <div id="premium" className="field">
                <label className='label' htmlFor="premium">Premium? </label>
                <input id="premiumCheck" type="checkbox" name="premiumCheck" />
            </div>

            <button className='button is-link' type='submit' value='Sign up'>Sign Up</button>
        </form>
    )
};

// Init function
const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow />,
            document.getElementById('content'));
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow />,
            document.getElementById('content'));
        return false;
    });

    ReactDOM.render(<LoginWindow />,
        document.getElementById('content'));
};

window.onload = init;
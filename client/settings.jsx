const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');



const SettingsWindow = (props) => {
    <form id="settingsForm"
    name='settingsForm'
    onSubmit={handleSettings}
    action='/settingChange'
    method='GET'
    className='mainForm'>
        <label htmlFor='changeUser'>Would you like to change your username? </label>
        <input id='changeUser' name='changeUser' className='formSubmit' type='submit' value="Click Here!"/>
        <label htmlFor='changePass'>Would you like to change your password?</label>
        <input id='changePass' name='changePass' className='formSubmit' type='submit' value="Click Here!"/>
    </form>
}
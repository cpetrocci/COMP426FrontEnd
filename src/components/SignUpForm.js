import React from 'react'
import { useState } from 'react'
import Button from './Button';
import axios from 'axios'

const SignUpForm = ({ signedUp }) => {
    const [signUpFailed, setsignUpFailed] = useState(false);
    const [signUpFailedText, setSignUpFailed] = useState('');
    const [userText, setUserText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    let tid = 0;

    const submit = async () => {
        if (userText === '' || passwordText === '') {
            setSignUpFailed('Username and/or password cannot be blank.');
            setsignUpFailed(true);
            return;
        }
        if (tid === 0) {
            setSignUpFailed('You must choose a color theme');
            setsignUpFailed(true);
            return;
        }
        const res = await axios({
            method: 'post',
            url: 'https://colepetrocci.pythonanywhere.com/user',
            data: {
                username: userText,
                password: passwordText
            }
        }).catch(err => {console.log(err)});
        if(res != null) {
            signedUp({ userText, tid });
            setsignUpFailed(false);
        } else {
            setSignUpFailed('Username already exists');
            setsignUpFailed(true);
        }
    }

    return (
        <div className='box'>   
            <label className='label'>Username</label>
            <div className='control' style={{padding: '10px'}}>
                <input className='input' type='text' placeholder='Username' value={userText} onChange={(e) => setUserText(e.target.value)} ></input>
            </div>
            {signUpFailed && <p className="has-text-danger">{signUpFailedText}</p>}
            <label className='label'>Password</label>
            <div className='control' style={{padding: '10px'}}>
                <input className='input' type='text' placeholder='Password' value={passwordText} onChange={(e) => setPasswordText(e.target.value)} ></input>
            </div>
            <Button className='button is-danger' onClick={() => tid = 1} text='The Dark Side'/>
            <Button className='button is-info' onClick={() => tid = 2} text='The Light Side'/>
            <div style = {{padding: '10px'}}>
                <Button className='button is-success' onClick={submit} text='Submit' />
            </div>
        </div>
    )
}

export default SignUpForm

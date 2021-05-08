import React from 'react'
import { useState } from 'react'
import Button from './Button';
import axios from 'axios'

const LoginForm = ({logIn}) => {
    const [signInFailed, setsignInFailed] = useState(false);
    const [signInFailedText, setsignInFailedText] = useState('');
    const [userText, setUserText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [hiddenText,  setHiddenText] = useState('');

    const submit = async () => {
        if (userText === '' || passwordText === '') {
            setsignInFailedText('Username and/or password cannot be blank.');
            setsignInFailed(true);
            return;
        }
        const res = await axios({
            method: 'get',
            url: 'https://colepetrocci.pythonanywhere.com/user/' + userText,
        }).catch(err => {console.log(err)});
        if(res != null) {
            if (res.data.username === userText && res.data.password === passwordText) {
                logIn(userText);
            } else {
                setsignInFailedText('Incorrect password. Please try again.')
                setsignInFailed(true);
            }
        } else {
            setsignInFailedText('This user does not exist.');
            setsignInFailed(true);
        }
    }
    return (
        <div className='box'>   
            <label className='label'>Username</label>
            <div className='control' style={{padding: '10px'}}>
                <input className='input' type='text' placeholder='Username' value={userText} onChange={(e) => setUserText(e.target.value)} ></input>
            </div>
            {signInFailed && <p className="has-text-danger">{signInFailedText}</p>}
            <label className='label'>Password</label>
            <div className='control' style={{padding: '10px'}}>
                <input className='input' type='text' placeholder='Password' value={hiddenText} 
                onChange={(e) => setPasswordText(previous => {
                    if (e.target.value.split('').length < hiddenText.split('').length) {
                        let temp = previous.split('');
                        let pass = '';
                        let hiddenPass = '';
                        let count = 0;
                        temp.forEach( char => {
                            if(count === temp.length - 1) {
                                return;
                            }
                            pass += char;
                            hiddenPass += '*';
                            count++;
                        })
                        setHiddenText(hiddenPass);
                        return pass;
                    } else {
                        let temp = e.target.value.split('');
                        let pass = '';
                        temp.forEach(() => {
                            pass += '*';
                        })
                        setHiddenText(pass);
                        return previous + temp[temp.length - 1];
                    }
                    })} ></input>
            </div>
            <div style = {{padding: '10px'}}>
                <Button className='button is-success' onClick={submit} text='Submit' />
            </div>
        </div>
    )
}

export default LoginForm

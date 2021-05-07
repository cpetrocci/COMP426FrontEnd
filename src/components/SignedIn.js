import React from 'react'
import Button from './Button'

const SignedIn = ({ user, logOut, theme}) => {
    return (
        <div style={{textAlign: 'right'}}>
        <p style={{color: theme.text_color}}>{user.username}</p>
            <Button className='button is-small' onClick={logOut} text='Log Out'/>
        </div>
    )
}

export default SignedIn

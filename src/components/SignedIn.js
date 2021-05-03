import React from 'react'
import Button from './Button'

const SignedIn = ({ user, logOut}) => {
    return (
        <div style={{textAlign: 'right'}}>
            <p>{user.username}</p>
            <Button className='button is-danger is-small' onClick={logOut} text='Log Out'/>
        </div>
    )
}

export default SignedIn

import { Button } from '@material-ui/core'
import React from 'react'
import './Header.css'
import { auth } from './firebase'
function Header({ openModal, user ,handleSigningIn}) {
    return (
        <div className='header'>
            <img className='header__logo' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
            <input className='header__search' type="text" />
            {user ?
                (<Button onClick={() => auth.signOut()} >Log Out</Button>)
                :
                <div className="header__authentication">
                    <Button onClick={handleSigningIn} >Sign In</Button>
                    <Button onClick={openModal} >Sign Up</Button>
                </div>
            }

        </div>
    )
}

export default Header

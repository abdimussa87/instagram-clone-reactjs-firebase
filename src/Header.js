import React from 'react'
import './Header.css'
function Header() {
    return (
        <div className='header'>
            <img className='header__logo' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt=""/>
            <input className='header__search' type="text"/>
        </div>
    )
}

export default Header

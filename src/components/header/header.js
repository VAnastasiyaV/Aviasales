import React, { } from 'react';
import planeLogo from './plane.png';
import './header.scss';

function Header() {
    return (
        <div className='header'>
            <img className='header__img' src={planeLogo} alt='plane' />
        </div>
    )
}

export default Header;
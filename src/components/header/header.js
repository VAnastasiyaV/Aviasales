import React, { } from 'react';

import './header.scss';

function Header() {
   return (
      <div className='header'>
         <img className='header__img' src={require('./plane.png')} alt='plane' />
      </div>
   )
}

export default Header;
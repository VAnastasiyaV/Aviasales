import React, { } from 'react';

import './spinner.scss';

function Spinner() {

    return (
        <div className='spinner'>
            <div className='spinner__label'>Идет загрузка билетов...</div>
            <div className='spinner__animation' />
        </div >
    )
}

export default Spinner;

import React, { } from 'react';
import useInfo from '../../redux/useInfo';

import './footer.scss';

function Footer() {
    const {
        showTickets,
        numberTickets,
    } = useInfo();

    const onClickBtn = (e) => {
        showTickets(e.target.id)
    }

    let classNameBack = 'footer__button';
    if (numberTickets === 1) classNameBack += ' footer__button--disabled'

    return (
        <div className='footer'>
            <button
                id='previousTickets'
                type="button"
                className={classNameBack}
                onClick={(e) => onClickBtn(e)}
            >
                назад
            </button>
            <button
                id='moreTickets'
                type="button"
                className='footer__button'
                onClick={(e) => onClickBtn(e)}
            >
                Cледующие 5 билетов
            </button>
        </div >
    )
}

export default Footer;

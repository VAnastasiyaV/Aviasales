import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SelectAllTicketsRecieved } from "../../redux/reduser/ticketReducer";
import { showTicketsAction } from "../../redux/reduser/filterReducer";

import './footer.scss';

function Footer() {
    const allTicketsRecieved = SelectAllTicketsRecieved();
    const dispatch = useDispatch();
    const showTickets = useCallback(
        (id) => dispatch(showTicketsAction(id)),
        [dispatch]
    );

    const onClickBtn = (e) => {
        showTickets(e.target.id)
    }

    let classFooter = 'footer';

    if (!allTicketsRecieved) classFooter += ' footer--loading';

    return (
        <div className={classFooter}>
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

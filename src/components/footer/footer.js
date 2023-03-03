import React, {  useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { showTicketsAction } from "../../redux/reduser/filterReducer";

import './footer.scss';

function Footer() {
    const dispatch = useDispatch();
    const showTickets = useCallback(
        (id) => dispatch(showTicketsAction(id)),
        [dispatch]
    );

    const onClickBtn = (e) => {
        showTickets(e.target.id)
    }

    return (
        <div className='footer'>
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

import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Offline, Online } from "react-detect-offline";
import {
    SelectAllTicketsRecieved,
    SelectError,
    fetchDataActionCreator,
} from "../../redux/reduser/ticketReducer";

import TransfersFilter from '../transfers-filter';
import Sorting from '../sorting';
import Header from '../header';
import TicketList from '../ticket-list';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner'

import './app.scss';

function App() {
    const dispatch = useDispatch();
    const error = SelectError();
    const allTicketsRecieved = SelectAllTicketsRecieved();
    const fetchData = useCallback(
        () => dispatch(fetchDataActionCreator()),
        [dispatch]
    );

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) {
        return <ErrorIndicator />
    }

    const load = !allTicketsRecieved ? <Spinner /> : null;

    return (
        <div>
            <Online>
                <div className='app'>
                    <Header />
                    <TransfersFilter />
                    <Sorting />
                    {load}
                    <TicketList />
                </div>
            </Online>
            <Offline>
                <p className='app__offline'>You are offline right now. Check your connection.</p>
            </Offline>
        </div>
    )
}

export default App;

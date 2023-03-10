import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offline, Online } from "react-detect-offline";
import {
    selectAllTicketsRecieved,
    selectError,
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
    const error = useSelector(selectError);
    const allTicketsRecieved = useSelector(selectAllTicketsRecieved);

    useEffect(() => {
        dispatch(fetchDataActionCreator());
    }, [dispatch]
    );

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

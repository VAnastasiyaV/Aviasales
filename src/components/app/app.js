import React, { } from 'react';
import { Offline, Online } from "react-detect-offline";
import useInfo from '../../redux/useInfo';

import TransfersFilter from '../transfers-filter';
import Sorting from '../sorting';
import Header from '../header';
import TicketList from '../ticket-list';
import ErrorIndicator from '../error-indicator';

import './app.scss';

function App() {
    const {
        error,
        url,
    } = useInfo();


    if (error && !url) {
        return <ErrorIndicator />
    }

    return (
        <div>
            <Online>
                <div className='app'>
                    <Header />
                    <TransfersFilter />
                    <Sorting />
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

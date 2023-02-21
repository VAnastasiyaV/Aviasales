import React, { } from 'react';
import { connect } from 'react-redux';

import TransfersFilter from '../transfers-filter';
import Sorting from '../sorting';
import Header from '../header';
import Footer from '../footer';
import TicketList from '../ticket-list';
import ErrorIndicator from '../error-indicator';

import './app.scss';

function App({ loader, filtratedTickets, error, url }) {
    let footer;
    if (!loader) {
        footer = filtratedTickets.length !== 0
            ? <Footer />
            : null;
    }

    if (error && !url) {
        return <ErrorIndicator />
    }

    if (error && !!url) {
    // eslint-disable-next-line no-console
        console.log(error)
    }

    return (
        <div className='app__body'>
            <Header />
            <TransfersFilter />
            <Sorting />
            <TicketList />
            {footer}
        </div>
    )
}

const mapStateToProps = state => ({
    allTicketsRecieved: state.tickets.allTicketsRecieved,
    filtratedTickets: state.tickets.filtratedTickets,
    error: state.tickets.error,
    url: state.tickets.url
})

export default connect(mapStateToProps)(App);
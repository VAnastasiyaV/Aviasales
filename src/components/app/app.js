import React, { } from 'react';
import { connect } from 'react-redux';

import TransfersFilter from '../transfers-filter';
import Sorting from '../sorting';
import Header from '../header';
import Footer from '../footer';
import TicketList from '../ticket-list';

import './app.scss';

function App({ loader, filtratedTickets }) {
  let footer;
  if (!loader) {
    footer = filtratedTickets.length !== 0
      ? <Footer />
      : null;
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

const mapStateToProps = state => {
  return {
    allTicketsRecieved: state.tickets.allTicketsRecieved,
    filtratedTickets: state.tickets.filtratedTickets
  }
}

export default connect(mapStateToProps)(App);
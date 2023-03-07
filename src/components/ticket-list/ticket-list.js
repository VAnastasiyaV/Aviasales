import React, { } from 'react';
import { useSelector } from 'react-redux';
import {
    selectTransfersFilterArr,
    selectTypeOfSorting,
    selectNumberTickets
} from "../../redux/reduser/filterReducer";
import {
    selectAllTickets,
    selectAllTicketsRecieved,
} from "../../redux/reduser/ticketReducer";

import Ticket from '../ticket'
import Empty from '../empty'
import Footer from '../footer';

import './ticket-list.scss';

function TicketList() {
    const allTickets = useSelector(selectAllTickets);
    const allTicketsRecieved = useSelector(selectAllTicketsRecieved);
    const transfersFilterArr = useSelector(selectTransfersFilterArr);
    const typeOfSorting = useSelector(selectTypeOfSorting);
    const numberTickets = useSelector(selectNumberTickets);
    let empty = null;

    const getFiltratedTickets = () => {
        let selectedTickets = [];
        const filters = transfersFilterArr;

        filters.forEach(filter => {
            selectedTickets = selectedTickets.concat(allTickets
                .filter(ticket => ticket.stopNames1.length === filter
                ));
        });

        return selectedTickets;
    };

    const getSortedTickets = () => {
        let selectedTickets = getFiltratedTickets();

        selectedTickets = selectedTickets.sort((ticket1, ticket2) => {

            if (typeOfSorting === "cheapest") {
                return ticket1.price - ticket2.price;
            }

            if (ticket1.duration1 === ticket2.duration1) {
                return ticket1.duration2 - ticket2.duration2;
            }
            return ticket1.duration1 - ticket2.duration1
        });

        return selectedTickets;
    };

    const tickets = getSortedTickets().slice(0, numberTickets * 5);
    const elements = tickets.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key 
        <li key={index}>
            <Ticket
                data={item}
            />
        </li>
    ));

    const footer = tickets.length !== 0
        ? <Footer />
        : null;

    let classTicketList = 'ticket-list';

    if (!allTicketsRecieved) classTicketList += ' ticket-list--loading';

    if (allTickets.length !== 0) {
        empty = tickets.length === 0
            ? <Empty />
            : null;
    };

    return (
        <>
            <ul className={classTicketList} >
                {elements}
            </ul>
            {empty}
            {footer}
        </>
    )
}

export default TicketList;

import React, { useEffect } from 'react';
import useInfo from '../../redux/useInfo';
import Ticket from '../ticket'
import Spinner from '../spinner'
import Empty from '../empty'
import Footer from '../footer';

import './ticket-list.scss';

// eslint-disable-next-line react/display-name
const TicketList = React.memo(
    () => {
        const {
            loader,
            allTickets,
            allTicketsRecieved,
            url,
            transfersFilterArr,
            typeOfSorting,
            numberTickets,
            fetchTickets,
            fetchData
        } = useInfo();

        let empty;

        useEffect(() => {
            if (!url) {
                fetchData()
            }
        }, [fetchData, url]);

        useEffect(() => {
            if (!loader && !allTicketsRecieved && url !== '') {
                fetchTickets(url, allTickets)
            }
        }, [loader, allTicketsRecieved, url, allTickets, fetchTickets]);

        const getFiltratedTickets = () => {
            let selectedTickets = [];
            const filters = transfersFilterArr;

            filters.forEach(filter => {
                selectedTickets = selectedTickets.concat(allTickets
                    .filter(ticket => ticket.stopNames1.length === filter
                    ));
            });
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

        const getTimeForTicket = (hours, minutes) => {
            const newHours = hours > 9 ? hours : `0${hours}`;
            const newMinutes = minutes > 9 ? minutes : `0${minutes}`;
            return `${newHours}:${newMinutes}`
        };

        const getDuration = (duration) => {
            const hours = Math.floor(duration / 60);
            const minutes = duration - hours * 60;
            return getTimeForTicket(hours, minutes);
        };

        const getTime = (departureDate, duration = 0) => {
            const date = new Date(Date.parse(departureDate) + duration * 60 * 1000);
            return getTimeForTicket(date.getHours(), date.getMinutes());
        };

        const getStopsNumber = (stopsNumber) => {
            switch (stopsNumber) {
            case 0:
                return '-';
            case 1:
                return '1 пересадка';
            case 2:
                return '2 пересадки';
            case 3:
                return '3 пересадки';

            default:
                return stopsNumber;
            }
        };

        const tickets = getFiltratedTickets();

        const footer = tickets.length !== 0
            ? <Footer />
            : null;

        const load = !allTicketsRecieved ? <Spinner /> : null;

        if (!loader) {
            empty = tickets.length === 0
                ? <Empty />
                : null;
        };

        const elements = tickets.filter((item, index) =>
            index >= (numberTickets * 5 - 5) && index < numberTickets * 5)
            .map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key 
                <li key={index}>
                    <Ticket
                        price={item.price}
                        logo={item.logo}
                        origin_name1={item.origin_name1}
                        destination1={item.destination1}
                        departureTime1={getTime(item.departureDate1)}
                        arrivalTime1={getTime(item.departureDate1, item.duration1)}
                        duration1={getDuration(item.duration1)}
                        stopsNumber1={getStopsNumber(item.stopNames1.length)}
                        stopNames1={item.stopNames1.join(', ').toLowerCase()}
                        origin_name2={item.origin_name2}
                        destination2={item.destination2}
                        departureTime2={getTime(item.departureDate2)}
                        arrivalTime2={getTime(item.departureDate2, item.duration2)}
                        duration2={getDuration(item.duration2)}
                        stopsNumber2={getStopsNumber(item.stopNames2.length)}
                        stopNames2={item.stopNames2.join(', ').toLowerCase()}
                    />
                </li>
            ));

        return (
            <>
                {empty}
                <ul className='ticket-list' >
                    {load}
                    {elements}
                </ul>
                {footer}
            </>
        )
    });

export default TicketList;

import React, { } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchData, fetchTickets, setTickets } from '../../redux/actions/actions';
import Ticket from '../ticket'
import Spinner from '../spinner'
import Empty from '../empty'

import './ticket-list.scss';

class TicketList extends React.PureComponent {

    componentDidUpdate({ transfersFilterArr, allTickets, typeOfSorting, loader }) {
        const { url, allTicketsRecieved, fetchTickets } = this.props
        if (this.props.loader !== loader && !this.props.loader && !allTicketsRecieved) {
            fetchTickets(url, this.props.allTickets);
        }

        if (this.props.transfersFilterArr !== transfersFilterArr || this.props.allTickets !== allTickets)
            this.getFiltratedTickets();

        if (this.props.typeOfSorting !== typeOfSorting)
            this.getFiltratedTickets();
        // если вместо this.getFiltratedTickets(), 
        // выполнить строчку кода ниже - некорректная работа. почему - не могу разобраться....
        // this.doSorting(this.props.filtratedTickets);
    }

    getFiltratedTickets = () => {
        let selectedTickets = [];
        const filters = this.props.transfersFilterArr;
        const { allTickets } = this.props;


        filters.forEach(filter => {
            selectedTickets = selectedTickets.concat(allTickets
                .filter(ticket => ticket.stopNames1.length === filter
                    && ticket.stopNames2.length === filter
                ));
        })
        this.doSorting(selectedTickets);
    }

    doSorting = (array) => {

        const selectedTickets = array;
        selectedTickets.sort((ticket1, ticket2) => {

            if (this.props.typeOfSorting === "cheapest") {
                return ticket1.price - ticket2.price;
            }

            if (ticket1.duration1 === ticket2.duration1) {
                return ticket1.duration2 - ticket2.duration2;
            }
            return ticket1.duration1 - ticket2.duration1


        })
        return this.props.setTickets(selectedTickets)
    }

    getTimeForTicket = (hours, minutes) => {
        const newHours = hours > 9 ? hours : `0${hours}`;
        const newMinutes = minutes > 9 ? minutes : `0${minutes}`;
        return `${newHours}:${newMinutes}`
    }

    getDuration = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration - hours * 60;
        return this.getTimeForTicket(hours, minutes);
    }

    getTime = (departureDate, duration = 0) => {
        const date = new Date(Date.parse(departureDate) + duration * 60 * 1000);
        return this.getTimeForTicket(date.getHours(), date.getMinutes());
    }

    getStopsNumber = (stopsNumber) => {
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
    }

    render() {
        const tickets = this.props.filtratedTickets;
        const { numberTickets, loader, allTicketsRecieved } = this.props;
        const load = !allTicketsRecieved ? <Spinner /> : null;
        let empty;

        if (!loader) {
            empty = tickets.length === 0
                ? <Empty />
                : null;
        }

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
                        departureTime1={this.getTime(item.departureDate1)}
                        arrivalTime1={this.getTime(item.departureDate1, item.duration1)}
                        duration1={this.getDuration(item.duration1)}
                        stopsNumber1={this.getStopsNumber(item.stopNames1.length)}
                        stopNames1={item.stopNames1.join(', ').toLowerCase()}
                        origin_name2={item.origin_name2}
                        destination2={item.destination2}
                        departureTime2={this.getTime(item.departureDate2)}
                        arrivalTime2={this.getTime(item.departureDate2, item.duration2)}
                        duration2={this.getDuration(item.duration2)}
                        stopsNumber2={this.getStopsNumber(item.stopNames2.length)}
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
            </>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setTickets: bindActionCreators(setTickets, dispatch),
    fetchData: bindActionCreators(fetchData, dispatch),
    fetchTickets: bindActionCreators(fetchTickets, dispatch)
})

const mapStateToProps = state => ({
    loader: state.tickets.loading,
    allTickets: state.tickets.allTickets,
    allTicketsRecieved: state.tickets.allTicketsRecieved,
    filtratedTickets: state.tickets.filtratedTickets,
    transfersFilterArr: state.filters.transfersFilterArr,
    typeOfSorting: state.filters.sorting,
    numberTickets: state.filters.numberTickets,
    url: state.tickets.url
})

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);
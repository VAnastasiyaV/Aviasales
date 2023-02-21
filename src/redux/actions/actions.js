import * as actions from './actionsType';

export const setTransfers = (numberTransfers) => ({
    type: actions.SET_TRANSFER_FILTER,
    numberTransfers
});

export const requestTickets = () => ({
    type: actions.TICKETS_REQUEST,
});

export const recievedUrl = (res) => ({
    type: actions.URL_RECIEVED,
    payload: res
});

export const recievedTickets = (res) => ({
    type: actions.TICKETS_RECIEVED,
    payload: res.tickets,
    stop: res.stop
});

export const recievedError = (error) => ({
    type: actions.ERROR_RECIEVED,
    payload: error
});

export const setTickets = (tickets) => ({
    type: actions.TICKETS_FILTRATED,
    payload: tickets
});

export const setSorting = (typeOfSorting) => ({
    type: actions.SET_SORTING,
    payload: typeOfSorting
});

export const showTickets = (button) => ({
    type: actions.MORE_TICKETS,
    payload: button
});

export const fetchData = () => dispatch => {
    dispatch(requestTickets());
    return fetch(`https://aviasales-test-api.kata.academy/search`)
        .then(response => response.json(),
            error => dispatch(recievedError(error)))
        .then(res => {
            dispatch(recievedUrl(res.searchId))
        }
        )
        .catch(error => dispatch(recievedError(error)))
};

export const fetchTickets = (url, tickets = []) => dispatch => {
    dispatch(requestTickets());
    return fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${url}`)
        .then(response => {
            if (response.status > 199 && response.status < 300) {
                return response.json();
            }
            dispatch(fetchTickets(url, tickets));
            return Promise.reject(response);

        })
        .then(res => {
            const resTickets = res.tickets.map(item => {
                const newItem = {
                    price: item.price,
                    logo: item.carrier,
                    origin_name1: item.segments[0].origin,
                    destination1: item.segments[0].destination,
                    departureDate1: item.segments[0].date,
                    duration1: item.segments[0].duration,
                    stopNames1: item.segments[0].stops,
                    origin_name2: item.segments[1].origin,
                    destination2: item.segments[1].destination,
                    departureDate2: item.segments[1].date,
                    duration2: item.segments[1].duration,
                    stopNames2: item.segments[1].stops
                }
                return newItem
            })
            tickets = tickets.concat(resTickets);
            dispatch(recievedTickets({ stop: res.stop, tickets }));
        })
        .catch(error => dispatch(recievedError(error)))
}

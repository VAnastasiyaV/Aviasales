// Actions Type
const TICKETS_REQUEST = 'TICKETS_REQUEST';
const TICKETS_RECIEVED = 'TICKETS_RECIEVED';
const ERROR_RECIEVED = 'ERROR_RECIEVED';

// Actions
const requestTickets = () => ({
    type: TICKETS_REQUEST,
});

const recievedTickets = (res) => ({
    type: TICKETS_RECIEVED,
    payload: res.tickets,
    stop: res.stop
});

const recievedError = (error) => ({
    type: ERROR_RECIEVED,
    payload: error
});

let erorrsNumber = 0;
let searchId = '';

// Actions creators
export const fetchDataActionCreator = () => dispatch => {
    dispatch(requestTickets());

    return fetch(`https://aviasales-test-api.kata.academy/search`)
        .then(response => response.json())
        .then(res => {
            erorrsNumber = 0;
            searchId = res.searchId;
            dispatch(fetchTicketsActionCreator(res.searchId));
        }
        )
        .catch(error => {
            erorrsNumber++;
            // eslint-disable-next-line no-unused-expressions 
            erorrsNumber < 6
                ? dispatch(fetchDataActionCreator())
                : dispatch(recievedError(error));
        })
};

export const fetchTicketsActionCreator = (url, tickets = []) => dispatch => {
    dispatch(requestTickets());
    return fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${url}`)
        .then(response => {
            if (response.status > 199 && response.status < 300) {
                erorrsNumber = 0;
                return response.json();
            }
            throw new Error;

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
                    originName2: item.segments[1].origin,
                    destination2: item.segments[1].destination,
                    departureDate2: item.segments[1].date,
                    duration2: item.segments[1].duration,
                    stopNames2: item.segments[1].stops
                }
                return newItem
            })
            tickets = tickets.concat(resTickets);
            dispatch(recievedTickets({ stop: res.stop, tickets }));
            if (!res.stop) {
                dispatch(fetchTicketsActionCreator(searchId, tickets));
            }
        })
        .catch(error => {
            erorrsNumber++;
            // eslint-disable-next-line no-unused-expressions 
            erorrsNumber < 6
                ? dispatch(fetchTicketsActionCreator(searchId, tickets))
                : dispatch(recievedError(error));
        })
}

// Selectors
export const selectLoading = (state) => state.tickets.loading;
export const selectAllTickets = (state) => state.tickets.allTickets;
export const selectError = (state) => state.tickets.error;
export const selectAllTicketsRecieved = (state) => state.tickets.allTicketsRecieved;


// ticketReducer
const initial = {
    allTickets: [],
    allTicketsRecieved: false,
    loading: true,
    error: null
};

// eslint-disable-next-line default-param-last
export const ticketReducer = (state = initial, action) => {
    switch (action.type) {
    case TICKETS_REQUEST:
        return { ...state, loading: true };

    case TICKETS_RECIEVED:
    {
        const allTickets = action.payload;
        const allTicketsRecieved = action.stop;
        return { ...state, allTickets, allTicketsRecieved, loading: false };
    }

    case ERROR_RECIEVED:
    {
        const error = action.payload;
        return { ...state, error };
    }

    default:
        return state;
    }
};

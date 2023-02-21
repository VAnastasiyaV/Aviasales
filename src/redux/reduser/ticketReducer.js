import * as actionsType from "../actions/actionsType";

const initial = {
    allTickets: [],
    filtratedTickets: [],
    allTicketsRecieved: false,
    url: '',
    loading: false
};

// eslint-disable-next-line default-param-last
const ticketReducer = (state = initial, action) => {
    switch (action.type) {
    case actionsType.TICKETS_REQUEST:
        return { ...state, loading: true };

    case actionsType.TICKETS_RECIEVED:
    {
        const allTickets = action.payload;
        const allTicketsRecieved = action.stop;
        return { ...state, allTickets, allTicketsRecieved, loading: false };
    }

    case actionsType.URL_RECIEVED: {
        const url = action.payload;
        return { ...state, url, loading: false };
    }

    case actionsType.TICKETS_FILTRATED:
    {
        const filtratedTickets = action.payload;
        return { ...state, filtratedTickets };
    }

    case actionsType.ERROR_RECIEVED:
    {
        const error = action.payload;
        return { ...state, error };
    }

    default:
        return state;
    }
}

export default ticketReducer;


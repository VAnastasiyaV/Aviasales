// Actions Type
const SET_TRANSFER_FILTER = 'SET_TRANSFER_FILTER';
const SET_SORTING = 'SET_SORTING';
const MORE_TICKETS = 'MORE_TICKETS';

// Actions
export const setTransfersAction = (numberTransfers) => ({
    type: SET_TRANSFER_FILTER,
    numberTransfers
});

export const setSortingAction = (typeOfSorting) => ({
    type: SET_SORTING,
    payload: typeOfSorting
});

export const showTicketsAction = (button) => ({
    type: MORE_TICKETS,
    payload: button
});

// Selectors
export const selectTransfersFilterArr = state => state.filters.transfersFilterArr;
export const selectTypeOfSorting = (state) => state.filters.sorting;
export const selectNumberTickets = state => state.filters.numberTickets;

// filterReducer
const getTransfers = (numberTransfers, transfersFilterArr) => {
    let arrNumberTransfers = [];

    arrNumberTransfers = arrNumberTransfers.concat(numberTransfers);
    arrNumberTransfers.map(numberTransfer => {
        // при нажатии на фильтр "все" снимаем галочки, если был включен, иначе - устанавливаем галочки всех фильтров
        if (numberTransfer === -1) {
            transfersFilterArr = transfersFilterArr.includes(-1) ? [] : [-1, 0, 1, 2, 3];
            return numberTransfer;
        }

        // для остальных фильтров - снимаем соответствующую галочку и галочку "все"
        if (transfersFilterArr.includes(numberTransfer)) {
            transfersFilterArr = transfersFilterArr.filter(item => item !== numberTransfer);
            transfersFilterArr = transfersFilterArr.includes(-1)
                ? transfersFilterArr.filter(item => item !== -1)
                : transfersFilterArr;
            // для остальных фильтров - устанавливаем соответствующую галочку 
            // и галочку "все" - если выбраны четыре оставшихся фильтра
        } else {
            transfersFilterArr = transfersFilterArr.concat(numberTransfer);
            transfersFilterArr = transfersFilterArr.length === 4
                ? transfersFilterArr.concat(-1)
                : transfersFilterArr;
        }
        return numberTransfer;
    })

    return transfersFilterArr;
}


const initial = {
    transfersFilterArr: [],
    sorting: 'cheapest',
    numberTickets: 1
};

// eslint-disable-next-line default-param-last
export const filterReducer = (state = initial, action) => {
    switch (action.type) {

        case SET_TRANSFER_FILTER:
            {
                const transfersFilterArr = getTransfers(action.numberTransfers, state.transfersFilterArr);
                return { ...state, transfersFilterArr, numberTickets: 1 };
            }

        case SET_SORTING:
            {
                const sorting = action.payload;
                return { ...state, sorting };
            }

        case MORE_TICKETS:
            {
                let numberTickets;
                if (action.payload === 'moreTickets') {
                    numberTickets = state.numberTickets + 1;
                } else {
                    numberTickets = state.numberTickets > 1
                        ? state.numberTickets - 1
                        : state.numberTickets;
                }
                return { ...state, numberTickets };
            }

        default:
            return state;
    }
};

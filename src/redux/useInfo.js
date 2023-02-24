import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDataActionCreator, fetchTicketsActionCreator,
    setTransfers, showTicketsActionCreator, setSortingActionCreator
} from './actions/actions';

const useInfo = () => {
    const dispatch = useDispatch();

    return {
        loader: useSelector(state => state.tickets.loading),
        allTickets: useSelector(state => state.tickets.allTickets),
        allTicketsRecieved: useSelector(state => state.tickets.allTicketsRecieved),
        url: useSelector(state => state.tickets.url),
        error: useSelector(state => state.tickets.error),
        transfersFilterArr: useSelector(state => state.filters.transfersFilterArr),
        typeOfSorting: useSelector(state => state.filters.sorting),
        numberTickets: useSelector(state => state.filters.numberTickets),
        fetchTickets: useCallback(
            (url, allTickets) => dispatch(fetchTicketsActionCreator(url, allTickets)),
            [dispatch]
        ),
        fetchData: useCallback(
            () => dispatch(fetchDataActionCreator()),
            [dispatch]
        ),
        setTransfer: useCallback(
            (arr) => dispatch(setTransfers(arr)),
            [dispatch]
        ),
        showTickets: useCallback(
            (id) => dispatch(showTicketsActionCreator(id)),
            [dispatch]
        ),
        setSorting: useCallback(
            (type) => dispatch(setSortingActionCreator(type)),
            [dispatch]
        ),
    }
}

useInfo.displayName = 'useInfo';

export default useInfo;
import React, {  useCallback } from 'react';
import { useDispatch } from 'react-redux';

import {
    SelectTypeOfSorting,
    setSortingAction
} from "../../redux/reduser/filterReducer";

import './sorting.scss';

function Sorting() {
    const dispatch = useDispatch();
    const typeOfSorting = SelectTypeOfSorting();
    const setSorting = useCallback(
        (id) => dispatch(setSortingAction(id)),
        [dispatch]
    );

    const onClickBtnActive = (e) => {
        if (e.target.id !== typeOfSorting)
            setSorting(e.target.id)
    }

    const getClassName = (btn) => {
        let classNameBtn = btn === 'cheapest'
            ? 'sorting__button sorting__button--left'
            : 'sorting__button sorting__button--right';
        if (btn === typeOfSorting) classNameBtn += ' sorting__button--active';
        return classNameBtn
    }

    return (
        <div className='sorting'>
            <button
                id='cheapest'
                type="button"
                className={getClassName('cheapest')}
                onClick={(e) => onClickBtnActive(e)}
            >
                Самый дешевый
            </button>
            <button
                id='fastest'
                type="button"
                className={getClassName('fastest')}
                onClick={(e) => onClickBtnActive(e)}
            >
                Самый быстрый
            </button>
        </div >
    )
}

export default Sorting;

import React, { } from 'react';
import { useSelector } from 'react-redux';
import { selectTransfersFilterArr } from "../../redux/reduser/filterReducer";

import './checkbox.scss';

function Checkbox({ value, text, onChangeTransferFilter }) {

    const transfersFilterArr = useSelector(selectTransfersFilterArr);

    const handleChange = () => {
        onChangeTransferFilter(value);
    };

    return (
        <div className='filters'>
            <input
                id={`filter${value}`}
                type='checkbox'
                className='transfers-filter__checkbox'
                value={value}
                onChange={handleChange}
                checked={transfersFilterArr.includes(value)}
            />
            <label className='transfers-filter__label' htmlFor={`filter${value}`}>
                <span>{text}</span>
            </label>
        </div>
    )
}

export default Checkbox;

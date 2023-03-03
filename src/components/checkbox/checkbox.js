import React, { } from 'react';
import { SelectTransfersFilterArr } from "../../redux/reduser/filterReducer";

import './checkbox.scss';

function Checkbox(props) {

    const transfersFilterArr = SelectTransfersFilterArr();

    const handleChange = () => {
        props.onChangeTransferFilter(props.value);
    };

    return (
        <div className='filters'>
            <input
                id={`filter${props.value}`}
                type='checkbox'
                className='transfers-filter__checkbox'
                value={props.value}
                onChange={handleChange}
                checked={transfersFilterArr.includes(props.value)}
            />
            <label className='transfers-filter__label' htmlFor={`filter${props.value}`}>
                <span>{props.text}</span>
            </label>
        </div>
    )
}

export default Checkbox;

import React, { } from 'react';
import { connect } from 'react-redux';

import './checkbox.scss';

function Checkbox(props) {

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
                checked={props.transfersFilterArr.includes(props.value)}
            />
            <label className='transfers-filter__label' htmlFor={`filter${props.value}`}>
                <span>{props.text}</span>
            </label>
        </div>
    )
}

const mapStateToProps = (state) => ({
    transfersFilterArr: state.filters.transfersFilterArr
})

export default connect(mapStateToProps)(Checkbox);

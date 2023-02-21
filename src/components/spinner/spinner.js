import React, { } from 'react';
import { connect } from 'react-redux';

import './spinner.scss';

class Spinner extends React.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.allTicketsRecieved !== nextProps.allTicketsRecieved
    }

    render() {
        return (
            <div className='spinner'>
                <div className='spinner__label'>Идет загрузка билетов...</div>
                <div className='spinner__animation' />
            </div >
        )
    }
}

const mapStateToProps = state => ({
    allTicketsRecieved: state.tickets.allTicketsRecieved,
})

export default connect(mapStateToProps)(Spinner);

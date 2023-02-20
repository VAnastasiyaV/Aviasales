import React, { } from 'react';
import { connect } from 'react-redux';

import './spinner.scss';

class Spinner extends React.Component {
   shouldComponentUpdate(nextProps) {
      console.log(this.props.allTicketsRecieved !== nextProps.allTicketsRecieved)
      return this.props.allTicketsRecieved !== nextProps.allTicketsRecieved
   }

   render() {
      return (
         <div className='spinner'>
            <div className='spinner__label'>Идет загрузка билетов...</div>
            <div className='spinner__animation'></div>
         </div >
      )
   }
}

const mapStateToProps = state => {
   return {
      allTicketsRecieved: state.tickets.allTicketsRecieved,
   }
}

export default connect(mapStateToProps)(Spinner);

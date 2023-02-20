import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showTickets } from '../../redux/actions/actions.js'

import './footer.scss';

function Footer({ showTickets, numberTickets }) {

   const onClickBtn = (e) => {
      showTickets(e.target.id)
   }

   let classNameBack = 'footer__button';
   if (numberTickets === 1) classNameBack += ' footer__button--disabled'

   return (
      <div className='footer'>
         <button
            id='previousTickets'
            type="button"
            className={classNameBack}
            onClick={(e) => onClickBtn(e)}
         >
            назад
         </button>
         <button
            id='moreTickets'
            type="button"
            className='footer__button'
            onClick={(e) => onClickBtn(e)}
         >
            Cледующие 5 билетов
         </button>
      </div >
   )
}

const mapDispatchToProps = dispatch => {
   return {
      showTickets: bindActionCreators(showTickets, dispatch),
   }
}

const mapStateToProps = state => {
   return {
      numberTickets: state.filters.numberTickets,
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

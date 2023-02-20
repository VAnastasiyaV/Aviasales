import React from "react";
import { connect } from "react-redux";
import Checkbox from "../checkbox";
import { setTransfers } from "../../redux/actions/actions.js"

import './transfers-filter.scss';

class TransfersFilter extends React.Component {

   // Кнопки выбора пересадок
   transfers = [
      {
         text: "Все",
         value: -1,
         checked: false,
      },
      {
         text: "Без пересадок",
         value: 0,
         checked: true,
      },
      {
         text: "1 пересадка",
         value: 1,
         checked: false,
      },
      {
         text: "2 пересадки",
         value: 2,
         checked: false,
      },
      {
         text: "3 пересадки",
         value: 3,
         checked: false,
      }
   ];

   componentDidMount() {
      let arr = [];
      this.transfers.map((item) => {
         if (item.checked) {
            arr = arr.concat(item.value);
         }
         return item;
      })

      if (arr.length > 0) {
         this.props.setTransfers(arr)
      }
   }

   render() {
      const elements = this.transfers.map((item) => {
         return (
            <li key={item.value} className='transfers-filter__item'>
               <Checkbox
                  value={item.value}
                  text={item.text}
                  onChangeTransferFilter={this.props.setTransfers}
               />
            </li>
         )
      })

      return (
         <aside className="transfers-filter" >
            <p className="transfers-filter__title">Количество пересадок</p>
            <ul className='transfers-filter__list'>
               {elements}
            </ul>
         </aside>
      )
   }
}

const mapDispatchToProps = (dispatch) => ({
   setTransfers: (transfers) => dispatch(setTransfers(transfers))
});

export default connect(null, mapDispatchToProps)(TransfersFilter);



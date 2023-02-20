import React, { } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSorting } from '../../redux/actions/actions.js'

import './sorting.scss';

function Sorting(props) {

   const onClickBtnActive = (e) => {
      if (e.target.id !== props.typeOfSorting)
         props.setSorting(e.target.id)
   }

   const getClassName = (btn) => {
      let classNameBtn = btn === 'cheapest'
         ? 'sorting__button sorting__button--left'
         : 'sorting__button sorting__button--right';
      if (btn === props.typeOfSorting) classNameBtn += ' sorting__button--active';
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

const mapDispatchToProps = dispatch => {
   return {
      setSorting: bindActionCreators(setSorting, dispatch),
   }
}

const mapStateToProps = state => {
   return {
      typeOfSorting: state.filters.sorting,
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);

import React, { } from 'react';
import { Row, Col } from 'antd';

import './ticket.scss';

function Ticket({ price, origin_name1, logo, destination1, departureTime1, arrivalTime1,
   duration1, stopsNumber1, stopNames1, origin_name2, destination2, departureTime2, arrivalTime2,
   duration2, stopsNumber2, stopNames2 }) {
   return (
      <div className='ticket'>
         <Row gutter={[0, 0]} align='middle'>
            <Col span={16} className='ticket__price'>{price} P</Col>
            <Col span={8}>
               <img className='ticket__img' src={`http://pics.avs.io/99/36/${logo}.png`} alt='логотип авиакомпании' />
            </Col>
         </Row>
         <Row gutter={[0, 10]} align='top'>
            <Col span={8}>
               <p className='ticket__info ticket__info--grey'>{origin_name1} - {destination1}</p>
               <p className='ticket__info'>{departureTime1} - {arrivalTime1}</p>
            </Col>
            <Col span={8}>
               <p className='ticket__info ticket__info--grey'>в пути</p>
               <p className='ticket__info ticket__info--lower'>{duration1}</p>
            </Col>
            <Col span={8}>
               <p className='ticket__info ticket__info--grey'>{stopsNumber1}</p>
               <p className='ticket__info'>{stopNames1}</p>
            </Col>
            <Col span={8}>
               <p className='ticket__info ticket__info--grey'>{origin_name2} - {destination2}</p>
               <p className='ticket__info'>{departureTime2} - {arrivalTime2}</p>
            </Col>
            <Col span={8}>
               <p className='ticket__info ticket__info--grey'>в пути</p>
               <p className='ticket__info ticket__info--lower'>{duration2}</p>
            </Col>
            <Col span={8}>
               <p className='ticket__info ticket__info--grey'>{stopsNumber2}</p>
               <p className='ticket__info'>{stopNames2}</p>
            </Col>
         </Row>
      </div>
   )
}

export default Ticket;
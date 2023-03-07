import React, { } from 'react';
import { Row, Col } from 'antd';

import './ticket.scss';

function Ticket({ data }) {

    const getTimeForTicket = (hours, minutes) => {
        const newHours = hours > 9 ? hours : `0${hours}`;
        const newMinutes = minutes > 9 ? minutes : `0${minutes}`;
        return `${newHours}:${newMinutes}`
    };

    const getDuration = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration - hours * 60;
        return getTimeForTicket(hours, minutes);
    };

    const getTime = (departureDate, duration = 0) => {
        const date = new Date(Date.parse(departureDate) + duration * 60 * 1000);
        return getTimeForTicket(date.getHours(), date.getMinutes());
    };

    const getStopsNumber = (stopsNumber) => {
        switch (stopsNumber) {
        case 0:
            return '-';
        case 1:
            return '1 пересадка';
        case 2:
            return '2 пересадки';
        case 3:
            return '3 пересадки';

        default:
            return stopsNumber;
        }
    };

    return (
        <div className='ticket'>
            <Row gutter={[0, 0]} align='middle'>
                <Col span={16} className='ticket__price'>{data.price} P</Col>
                <Col span={8}>
                    <img className='ticket__img' src={`http://pics.avs.io/99/36/${data.logo}.png`} alt='логотип авиакомпании' />
                </Col>
            </Row>
            <Row gutter={[0, 10]} align='top'>
                <Col span={8}>
                    <p className='ticket__info ticket__info--grey'>{data.origin_name1} - {data.destination1}</p>
                    <p className='ticket__info'>
                        {getTime(data.departureDate1)} - {getTime(data.departureDate1, data.duration1)}
                    </p>
                </Col>
                <Col span={8}>
                    <p className='ticket__info ticket__info--grey'>в пути</p>
                    <p className='ticket__info ticket__info--lower'>{getDuration(data.duration1)}</p>
                </Col>
                <Col span={8}>
                    <p className='ticket__info ticket__info--grey'>{getStopsNumber(data.stopNames1.length)}</p>
                    <p className='ticket__info'>{data.stopNames1.join(', ').toLowerCase()}</p>
                </Col>
                <Col span={8}>
                    <p className='ticket__info ticket__info--grey'>{data.originName2} - {data.destination2}</p>
                    <p className='ticket__info'>
                        {getTime(data.departureDate2)} - {getTime(data.departureDate2, data.duration2)}
                    </p>
                </Col>
                <Col span={8}>
                    <p className='ticket__info ticket__info--grey'>в пути</p>
                    <p className='ticket__info ticket__info--lower'>{getDuration(data.duration2)}</p>
                </Col>
                <Col span={8}>
                    <p className='ticket__info ticket__info--grey'>{getStopsNumber(data.stopNames2.length)}</p>
                    <p className='ticket__info'>{data.stopNames2.join(', ').toLowerCase()}</p>
                </Col>
            </Row>
        </div>
    )
}

export default Ticket;
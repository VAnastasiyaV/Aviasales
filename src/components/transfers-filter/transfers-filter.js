import React, { useEffect, useMemo } from 'react';
import useInfo from '../../redux/useInfo';
import Checkbox from "../checkbox";

import './transfers-filter.scss';

export default function TicketList() {
    // Кнопки выбора пересадок
    const transfers = useMemo(() => [
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
    ], [])

    const {
        setTransfer
    } = useInfo();

    useEffect(() => {
        let arr = [];
        transfers.map((item) => {
            if (item.checked) {
                arr = arr.concat(item.value);
            }
            return item;
        })

        if (arr.length > 0) {
            setTransfer(arr)
        }
    }, [transfers, setTransfer]);

    const elements = transfers.map((item) => (
        <li key={item.value} className='transfers-filter__item'>
            <Checkbox
                value={item.value}
                text={item.text}
                onChangeTransferFilter={setTransfer}
            />
        </li>
    ))

    return (
        <aside className="transfers-filter" >
            <p className="transfers-filter__title">Количество пересадок</p>
            <ul className='transfers-filter__list'>
                {elements}
            </ul>
        </aside>
    )
}


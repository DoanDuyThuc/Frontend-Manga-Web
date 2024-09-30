import React from 'react'
import { NavLink } from 'react-router-dom'
import './CartItemComponent.scss'

export const CartItemComponent = () => {
    return (
        <div className='CartItemComponent'>
            <div className='CartItemComponent__CartItemAvartar'>
                <NavLink to='/a'>
                    <img src='https://ddntcthcd.com/nettruyen/thumb/ta-la-nhan-vat-phan-dien-dai-thieu-gia.jpg' alt='Win Over The Dragon Emperor This Time Around, Noble Girl!' />
                </NavLink>
                <div className='CartItemComponent__CartItemAvartar__notice'>
                    <span className='CartItemComponent__CartItemAvartar__notice__time'>30 Phút Trước</span>
                    <span className='CartItemComponent__CartItemAvartar__notice__Hot'>Hot</span>
                </div>
            </div>

            <div className='CartItemComponent__CartItemInfo'>
                <div className='CartItemComponent__CartItemInfo__name'>
                    <h3>
                        <NavLink to='/a'>Win Over The Dragon Emperor This Time Around, Noble</NavLink>
                    </h3>
                </div>

                <div className='CartItemComponent__CartItemInfo__chapter'>
                    <NavLink to='/a'>Chương 125</NavLink>
                </div>
            </div>
        </div>
    )
}

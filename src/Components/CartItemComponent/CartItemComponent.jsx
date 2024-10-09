import React from 'react'
import { NavLink } from 'react-router-dom'
import './CartItemComponent.scss'
import { TiDeleteOutline } from "react-icons/ti";

export const CartItemComponent = ({ marginZero, deleted }) => {
    return (
        <div className='CartItemComponent'>
            <div style={{ margin: marginZero ? 0 : '0 10px' }} className='CartItemComponent__CartItemAvartar'>
                <NavLink to='/truyen-tranh/one-piece'>
                    <img src='https://ddntcthcd.com/nettruyen/thumb/ta-la-nhan-vat-phan-dien-dai-thieu-gia.jpg' alt='Win Over The Dragon Emperor This Time Around, Noble Girl!' />
                </NavLink>
                <div className='CartItemComponent__CartItemAvartar__notice'>
                    <span className='CartItemComponent__CartItemAvartar__notice__time'>30 Phút Trước</span>
                    {deleted ? (
                        ''
                    ) : (
                        <span className='CartItemComponent__CartItemAvartar__notice__Hot'>Hot</span>
                    )}
                </div>
                {deleted && (
                    <span className='CartItemComponent__CartItemAvartar__Delete'>
                        <TiDeleteOutline />
                    </span>
                )}
            </div>

            <div className='CartItemComponent__CartItemInfo'>
                <div className='CartItemComponent__CartItemInfo__name'>
                    <h3>
                        <NavLink to='/truyen-tranh/one-piece'>Win Over The Dragon Emperor This Time Around, Noble</NavLink>
                    </h3>
                </div>

                <div className='CartItemComponent__CartItemInfo__chapter'>
                    <NavLink to='/truyen-tranh/one-piece'>Chương 125</NavLink>
                </div>
            </div>
        </div>
    )
}

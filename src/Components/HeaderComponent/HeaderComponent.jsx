import React from 'react'
import './HeaderComponent.scss'
import { HeaderTop } from './HeaderTop'
import { HeaderBottom } from './HeaderBottom'

export const HeaderComponent = () => {
    return (
        <div className='HeaderComponent'>
            <HeaderTop />
            <HeaderBottom />
        </div>
    )
}

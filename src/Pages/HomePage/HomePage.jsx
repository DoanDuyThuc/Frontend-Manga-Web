import React from 'react'
import './HomePage.scss'
import SliderHomeComponent from '../../Components/SliderHomeComponent/SliderHomeComponent'
import { ListHomePageComponent } from '../../Components/ListHomePageComponent/ListHomePageComponent'

export const HomePage = () => {
    return (
        <div className='HomePage'>
            <SliderHomeComponent />
            <ListHomePageComponent />
        </div>
    )
}
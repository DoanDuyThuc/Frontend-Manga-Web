import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Guests } from './Guests'

const Routers = () => {

    return (
        <Routes>
            {/* guest */}
            <Route path='/*' element={<Guests />} />

        </Routes>
    )
}

export default Routers
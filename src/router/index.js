import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Guests } from './Guests'
import { Users } from './Users'

const Routers = () => {

    return (
        <Routes>
            {/* guest */}
            <Route path='/*' element={<Guests />} />
            {/* Users */}
            <Route path='/user/*' element={<Users />} />

        </Routes>
    )
}

export default Routers
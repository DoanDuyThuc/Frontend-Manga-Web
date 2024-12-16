import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Guests } from './Guests'
import { Users } from './Users'
import { Authors } from './Authors'
import { Admin } from './Admin'
import { DefaultComponent } from '../Components/DefaultComponent/DefaultComponent'
import { HomePage } from '../Pages/HomePage/HomePage'

const Routers = () => {

    const user = useSelector(state => state.user)
    const Layout = DefaultComponent

    return (
        <Routes >
            {/* home */}
            <Route path='/' element={
                <Layout>
                    <HomePage />
                </Layout>
            } />

            {/* guest */}
            <Route path='/guest/*' element={<Guests />} />

            {/* {user} */}
            {user.isLogin && (
                <Route path='/user/*' element={<Users />} />
            )}

            {/* {Author} */}
            {(user.isLogin && (user.role === 'author' || user.role === 'admin')) ? (
                <Route path='/author/*' element={<Authors />} />
            ) : ''}

            {/* {admin} */}
            {user.isLogin && user.role === 'admin' && (
                <Route path='/admin/*' element={<Admin />} />
            )}


            <Route path="*" element={<div>not found</div>} />

        </Routes>
    )
}

export default Routers
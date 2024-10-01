import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../Pages/HomePage/HomePage'
import { DefaultComponent } from '../Components/DefaultComponent/DefaultComponent'
import { ListMangaPage } from '../Pages/ListMangaPage/ListMangaPage'

const guestsRouter =
    [
        {
            path: '/',
            page: HomePage,
            isHeaderFooter: true,
        },
        {
            path: '/truyen-moi-cap-nhat/:id',
            page: ListMangaPage,
            isHeaderFooter: true,
        },
    ]

export const Guests = () => {

    const Layout = DefaultComponent

    return (
        <Routes>
            {/* guest */}
            {guestsRouter.map((route, index) => {
                return (
                    <Route key={index} path={route.path} element={
                        route.isHeaderFooter ?
                            <Layout>
                                <route.page />
                            </Layout> :
                            <route.page />
                    } />
                )
            })}

        </Routes>
    )
}
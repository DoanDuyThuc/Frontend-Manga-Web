import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DefaultComponent } from '../Components/DefaultComponent/DefaultComponent'
import { ListMangaPage } from '../Pages/ListMangaPage/ListMangaPage'
import { DetailMangaPage } from '../Pages/DetailMangaPage/DetailMangaPage'
import { DetailChapterPage } from '../Pages/DetailChapterPage/DetailChapterPage'
import { ResetPassWordPage } from '../Pages/ResetPassWordPage/ResetPassWordPage'

const guestsRouter =
    [
        {
            path: '/truyen-moi-cap-nhat',
            page: ListMangaPage,
            isHeaderFooter: true,
        },
        {
            path: '/truyen-tranh/:truyen_ma',
            page: DetailMangaPage,
            isHeaderFooter: true,
        },
        {
            path: '/truyen-tranh/:truyen_ma/:TruyenId/:ChuongId',
            page: DetailChapterPage,
            isHeaderFooter: true,
        },

        {
            path: '/reset-password',
            page: ResetPassWordPage,
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
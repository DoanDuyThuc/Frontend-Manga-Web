import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DefaultAuthors } from '../Pages/AuthorsPage/DefaultAuthors'
import { MangaPublished } from '../Pages/AuthorsPage/MangaPublished'
import { UploadManga } from '../Pages/AuthorsPage/UploadManga'
import { MangaIsPending } from '../Pages/AuthorsPage/MangaIsPending'

const AuthorsRouter =
    [
        {
            path: '/dang-truyen',
            page: UploadManga,
            isLayoutAuthor: true,
        },
        {
            path: '/truyen-da-xuat-ban',
            page: MangaPublished,
            isLayoutAuthor: true,
        },
        {
            path: '/truyen-doi-duyet',
            page: MangaIsPending,
            isLayoutAuthor: true,
        },

    ]

export const Authors = () => {

    const Layout = DefaultAuthors

    return (
        <Routes>
            {/* guest */}
            {AuthorsRouter.map((route, index) => {
                return (
                    <Route key={index} path={route.path} element={
                        route.isLayoutAuthor ?
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
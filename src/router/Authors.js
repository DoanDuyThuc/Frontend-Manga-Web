import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DefaultAuthors } from '../Pages/AuthorsPage/DefaultAuthors'
import { MangaPublished } from '../Pages/AuthorsPage/MangaPublished'
import { MangaIsPending } from '../Pages/AuthorsPage/MangaIsPending'
import { ManagerTruyen } from '../Pages/AuthorsPage/ManagerTruyen'
import { UpdateTruyen } from '../Pages/AuthorsPage/UpdateTruyen'
import { AddChuongManga } from '../Pages/AuthorsPage/AddChuongManga'
import { ManagerDetailChuong } from '../Pages/AuthorsPage/ManagerDetailChuong'
import { UpdateChuong } from '../Pages/AuthorsPage/UpdateChuong'
import { AddTheLoaiManga } from '../Pages/AuthorsPage/AddTheLoaiManga'

const AuthorsRouter =
    [
        {
            path: '/dang-truyen',
            page: ManagerTruyen,
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
        {
            path: '/update-truyen/:truyen_ma',
            page: UpdateTruyen,
            isLayoutAuthor: true,
        },
        {
            path: '/add-chuong-truyen/:truyen_ma',
            page: AddChuongManga,
            isLayoutAuthor: true,
        },
        {
            path: '/chapter/:id/:ChuongId',
            page: ManagerDetailChuong,
            isLayoutAuthor: true,
        },
        {
            path: '/update-chuong/:id/:ChuongId',
            page: UpdateChuong,
            isLayoutAuthor: true,
        },
        {
            path: '/add-theloai-truyen/:truyen_ma/:id',
            page: AddTheLoaiManga,
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
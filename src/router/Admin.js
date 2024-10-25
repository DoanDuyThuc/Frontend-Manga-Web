import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DefaultAdmin } from '../Pages/AdminPage/DefaultAdmin'
import { ManagerAccount } from '../Pages/AdminPage/ManagerAccount'
import { UpdateUser } from '../Pages/AdminPage/UpdateUser'
import { ManagerTruyen } from '../Pages/AdminPage/ManagerTruyen'
import { UpdateTruyen } from '../Pages/AdminPage/UpdateTruyen'
import { AddChuongManga } from '../Pages/AdminPage/AddChuongManga'
import { ManagerDetailChuong } from '../Pages/AdminPage/ManagerDetailChuong'
import { UpdateChuong } from '../Pages/AdminPage/UpdateChuong'
import { ManagerTheLoai } from '../Pages/AdminPage/ManagerTheLoai'
import { AddTheLoaiManga } from '../Pages/AdminPage/AddTheLoaiManga'

const AdminRouter =
    [
        {
            path: '/quan-ly-tai-khoan',
            page: ManagerAccount,
            isLayoutAdmin: true,
        },
        {
            path: '/update-user/:id',
            page: UpdateUser,
            isLayoutAdmin: true,
        },
        {
            path: '/quan-ly-truyen',
            page: ManagerTruyen,
            isLayoutAdmin: true,
        },
        {
            path: '/update-truyen/:truyen_ma',
            page: UpdateTruyen,
            isLayoutAdmin: true,
        },

        {
            path: '/add-chuong-truyen/:truyen_ma',
            page: AddChuongManga,
            isLayoutAdmin: true,
        },
        {
            path: '/chapter/:id',
            page: ManagerDetailChuong,
            isLayoutAdmin: true,
        },
        {
            path: '/update-chuong/:id',
            page: UpdateChuong,
            isLayoutAdmin: true,
        },
        {
            path: '/quan-ly-the-loai',
            page: ManagerTheLoai,
            isLayoutAdmin: true,
        },
        {
            path: '/add-theloai-truyen/:truyen_ma/:id',
            page: AddTheLoaiManga,
            isLayoutAdmin: true,
        },
    ]

export const Admin = () => {

    const Layout = DefaultAdmin

    return (
        <Routes>
            {/* admin */}
            {AdminRouter.map((route, index) => {
                return (
                    <Route key={index} path={route.path} element={
                        route.isLayoutAdmin ?
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
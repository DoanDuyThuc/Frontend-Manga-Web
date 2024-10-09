import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DefaultComponent } from '../Components/DefaultComponent/DefaultComponent'
import { FollowerListPage } from '../Pages/ListInforMemberPage/FollowerListPage'
import { HistoryListPage } from '../Pages/ListInforMemberPage/HistoryListPage'
import { DefaultSettingInfor } from '../Pages/ListInforMemberPage/SettingPage/DefaultSettingInfor'
import { SettingManagerUser } from '../Pages/ListInforMemberPage/SettingPage/SettingManagerUser'
import { SettingChangePassword } from '../Pages/ListInforMemberPage/SettingPage/SettingChangePassword'


const UsersRouter =
    [
        {
            path: '/truyen-dang-theo-doi',
            page: FollowerListPage,
            isHeaderFooter: true,
        },

        {
            path: '/lich-su',
            page: HistoryListPage,
            isHeaderFooter: true,
        },

        {
            path: '/quan-ly-tai-khoan',
            page: SettingManagerUser,
            isLayout2: true,
            isHeaderFooter: true,
        },
        {
            path: '/doi-mat-khau',
            page: SettingChangePassword,
            isLayout2: true,
            isHeaderFooter: true,
        },
    ]

export const Users = () => {

    const Layout = DefaultComponent

    const Layout2 = DefaultSettingInfor

    return (
        <Routes>
            {/* Users */}
            {UsersRouter.map((route, index) => {
                return (
                    <Route key={index} path={route.path} element={
                        route.isHeaderFooter ?
                            <Layout>
                                {route.isLayout2 ?
                                    <Layout2>
                                        <route.page />
                                    </Layout2> :
                                    <route.page />
                                }
                            </Layout> :
                            <route.page />
                    } />
                )
            })}

        </Routes>
    )
}
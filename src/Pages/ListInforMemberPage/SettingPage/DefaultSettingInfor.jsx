import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaKey, FaUserCircle } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom'

export const DefaultSettingInfor = ({ children }) => {

    const location = useLocation();

    return (
        <div className='ListInforMemberPage'>

            <div className='ListInforMemberPage__main'>
                <Row>
                    <Col className='ListInforMemberPage__main__navUser' lg={4}>
                        <div>
                            <li className='ListInforMemberPage__main__navUser__item'>
                                <NavLink style={{
                                    color: location.pathname === '/user/quan-ly-tai-khoan' ?
                                        '#f18121' : '#000'
                                }} to='/user/quan-ly-tai-khoan'>
                                    <FaUserCircle />
                                    <span>Quản Lý Tài Khoản</span>
                                </NavLink>
                            </li>
                            <li className='ListInforMemberPage__main__navUser__item'>
                                <NavLink style={{
                                    color: location.pathname === '/user/doi-mat-khau' ?
                                        '#f18121' : '#000'
                                }} to='/user/doi-mat-khau'>
                                    <FaKey />
                                    <span>Đổi Mật Khẩu</span>
                                </NavLink>
                            </li>
                        </div>
                    </Col>

                    <Col lg={8}>
                        {children}
                    </Col>
                </Row>
            </div>
        </div >
    )
}

import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './AuthorsPage.scss'
import logo from '../../public/images/logo1.png'
import { NavLink, useLocation } from 'react-router-dom'
import { RiLogoutBoxLine } from "react-icons/ri";

import { TbBrowserCheck, TbBrowserX } from "react-icons/tb";
import { IoReloadCircle } from 'react-icons/io5'
import { IoIosCloudUpload } from 'react-icons/io'

export const DefaultAuthors = ({ children }) => {

    const location = useLocation();

    return (
        <div className='DefaultAuthors'>
            <Container fluid>
                <Row>
                    <Col lg={3}>
                        <div className='DefaultAuthors__left'>
                            <a className='DefaultAuthors__left__logo' href="/">
                                <img loading='lazy' src={logo} alt='author' />
                            </a>

                            <div className='DefaultAuthors__left__title'>
                                <strong>thucdn04</strong>
                                <p>Đây là trang quản lý truyện của bạn</p>
                            </div>

                            <ul className='DefaultAuthors__left__list'>
                                <li className='DefaultAuthors__left__list__item'>
                                    <NavLink style={{
                                        background: location.pathname === '/author/dang-truyen' ?
                                            '#4a4a4a' : 'none'
                                    }} to={'/author/dang-truyen'}>
                                        <IoIosCloudUpload />
                                        <span>Đăng Truyện</span>
                                    </NavLink>
                                </li>
                                <li className='DefaultAuthors__left__list__item'>
                                    <NavLink style={{
                                        background: location.pathname === '/author/truyen-da-xuat-ban' ?
                                            '#4a4a4a' : 'none'
                                    }} to={'/author/truyen-da-xuat-ban'}>
                                        <TbBrowserCheck />
                                        <span>Truyện đã xuất bản</span>
                                    </NavLink>
                                </li>
                                <li style={{
                                    background: location.pathname === '/author/truyen-doi-duyet' ?
                                        '#4a4a4a' : 'none'
                                }} className='DefaultAuthors__left__list__item'>
                                    <NavLink to={'/author/truyen-doi-duyet'}>
                                        <IoReloadCircle />
                                        <span>Truyện đang đợi duyệt</span>
                                    </NavLink>
                                </li>
                                <li style={{
                                    background: location.pathname === '/author/truyen-bi-tu-choi' ?
                                        '#4a4a4a' : 'none'
                                }} className='DefaultAuthors__left__list__item'>
                                    <NavLink to={'/author/truyen-bi-tu-choi'}>
                                        <TbBrowserX />
                                        <span>Truyện không được duyệt</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <li style={{ position: 'absolute', bottom: '0' }} className='DefaultAuthors__left__logout'>
                                <NavLink to={'/logout'}>
                                    <RiLogoutBoxLine />
                                    <span>Đăng Xuất</span>
                                </NavLink>
                            </li>
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className='DefaultAuthors__right'>
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

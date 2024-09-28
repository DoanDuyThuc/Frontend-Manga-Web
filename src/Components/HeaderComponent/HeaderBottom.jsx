import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCaretDown } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './HeaderComponent.scss'
import { Button } from 'react-bootstrap';

export const HeaderBottom = () => {

    return (
        <div className='HeaderComponent__Bottom'>
            <Navbar className='HeaderComponent__Bottom__nav' collapseOnSelect expand="lg" >
                <div className='HeaderComponent__Bottom__nav__container'>
                    <a className='HeaderComponent__Bottom__nav__container__Logo' href="/">Trang Chủ</a>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <ul className='HeaderComponent__Bottom__nav__container__List'>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <div>
                                        <NavLink to="/the-loai">Thể Loại</NavLink>
                                        <FaCaretDown />
                                    </div>
                                    <div>
                                        <div>
                                            adasdasd
                                        </div>
                                    </div>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <div>
                                        <NavLink to="/the-loai">Thể Loại</NavLink>
                                        <FaCaretDown />
                                    </div>
                                    <div>
                                        sadasd
                                    </div>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <NavLink to="/the-loai">Tìm Truyện</NavLink>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <NavLink to="/the-loai">Lịch Sử</NavLink>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <NavLink to="/the-loai">Theo Dõi</NavLink>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <NavLink to="/the-loai">Thảo Luận</NavLink>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <a to="/" href='' >Fanpage</a>
                                </li>
                                <li className='Button__User'>
                                    <Button variant="primary" size="sm" >Đăng Ký</Button>
                                    <Button variant="primary" size="sm" >Đăng Nhập</Button>
                                </li>
                            </ul>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </div>
    )
}

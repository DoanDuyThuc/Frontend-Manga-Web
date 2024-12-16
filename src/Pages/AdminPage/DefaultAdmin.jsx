import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './AdminPage.scss'
import logo from '../../public/images/logo1.png'
import { NavLink, useLocation } from 'react-router-dom'
import { RiLogoutBoxLine } from "react-icons/ri";

import { TbBrowserX } from "react-icons/tb";
import { IoReloadCircle } from 'react-icons/io5'
import { FaBook, FaUserCog } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { LogoutService } from '../../services/UserService'
import { clearUser } from '../../redux/user/userSlice'
import { toast } from 'react-toastify'

export const DefaultAdmin = ({ children }) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const location = useLocation();

    //mutation
    const mutationLogout = useMutation({
        mutationFn: LogoutService,
        onSuccess: (data) => {
            if (!data.error) {
                localStorage.removeItem('token');
                dispatch(clearUser());
                toast.success(`🐉 ${data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(`🐉 ${data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        },
        onError: (error) => {
            toast.error(`🐉 ${'có lỗi: ' + error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
    });

    const handleLogout = async () => {
        await mutationLogout.mutateAsync();
    }

    return (
        <div className='DefaultAdmin'>
            <Container fluid>
                <Row>
                    <Col lg={3}>
                        <div className='DefaultAdmin__left'>
                            <a className='DefaultAdmin__left__logo' href="/">
                                <img loading='lazy' src={logo} alt='author' />
                            </a>

                            <div className='DefaultAdmin__left__title'>
                                <strong>{user.username}</strong>
                                <p>Đây là trang quản lý (ADMIN)</p>
                            </div>

                            <ul className='DefaultAdmin__left__list'>
                                <li className='DefaultAdmin__left__list__item'>
                                    <NavLink style={{
                                        background: location.pathname === '/admin/quan-ly-tai-khoan' ?
                                            '#4a4a4a' : 'none'
                                    }} to={'/admin/quan-ly-tai-khoan'}>
                                        <FaUserCog />
                                        <span>Quản lý tài khoản</span>
                                    </NavLink>
                                </li>
                                <li className='DefaultAdmin__left__list__item'>
                                    <NavLink style={{
                                        background: location.pathname === '/admin/quan-ly-truyen' ?
                                            '#4a4a4a' : 'none'
                                    }} to={'/admin/quan-ly-truyen'}>
                                        <FaBook />
                                        <span>Quản lý truyện</span>
                                    </NavLink>
                                </li>
                                <li style={{
                                    background: location.pathname === '/admin/quan-ly-the-loai' ?
                                        '#4a4a4a' : 'none'
                                }} className='DefaultAdmin__left__list__item'>
                                    <NavLink to={'/admin/quan-ly-the-loai'}>
                                        <IoReloadCircle />
                                        <span>Thể loại truyện</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <li style={{ position: 'absolute', bottom: '0' }} className='DefaultAdmin__left__logout'>
                                <NavLink onClick={handleLogout} to={'/'}>
                                    <RiLogoutBoxLine />
                                    <span>Đăng Xuất</span>
                                </NavLink>
                            </li>
                        </div>
                    </Col>
                    <Col lg={9}>
                        <div className='DefaultAdmin__right'>
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

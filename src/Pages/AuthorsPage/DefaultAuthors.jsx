import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './AuthorsPage.scss'
import logo from '../../public/images/logo1.png'
import { NavLink, useLocation } from 'react-router-dom'
import { RiLogoutBoxLine } from "react-icons/ri";

import { TbBrowserCheck, TbBrowserX } from "react-icons/tb";
import { IoReloadCircle } from 'react-icons/io5'
import { IoIosCloudUpload } from 'react-icons/io'
import { useMutation } from '@tanstack/react-query'
import { LogoutService } from '../../services/UserService'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../redux/user/userSlice'
import { toast } from 'react-toastify'

export const DefaultAuthors = ({ children }) => {

    const dispatch = useDispatch();

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
                                        <span>Quản lý truyện của tác giả</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <li style={{ position: 'absolute', bottom: '0' }} className='DefaultAuthors__left__logout'>
                                <NavLink onClick={handleLogout} to={'/'}>
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

import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCaretDown } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './HeaderComponent.scss'
import { Button } from 'react-bootstrap';
import { HeaderItemContent } from './HeaderItemContent';

export const HeaderBottom = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');

    const toggleContent = (newText) => {
        setIsOpen((prev) => !prev);

        setText(() => (isOpen ? '' : newText));
    };



    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992) {
                setIsOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);


        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize)
        };
        ;
    }, []);

    return (
        <div className='HeaderComponent__Bottom'>
            <Navbar className='HeaderComponent__Bottom__nav' collapseOnSelect expand="lg" >
                <div className='HeaderComponent__Bottom__nav__container'>
                    <a className='HeaderComponent__Bottom__nav__container__Logo' href="/">Trang Chủ</a>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <ul className='HeaderComponent__Bottom__nav__container__List'>
                                <li onClick={() => toggleContent('TheLoai')} className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <span className='HeaderComponent__Bottom__nav__container__List__Item__Top'>
                                        <span>Thể Loại</span>
                                        <FaCaretDown />
                                    </span>
                                    <div className={
                                        'HeaderComponent__Bottom__nav__container__List__Item__Bottom'
                                    }
                                        style={{ display: text === 'TheLoai' && window.innerWidth < 992 ? "grid" : "" }}
                                    >
                                        <HeaderItemContent />
                                    </div>
                                </li>
                                <li onClick={() => toggleContent('XepHang')} className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <span className='HeaderComponent__Bottom__nav__container__List__Item__Top'>
                                        <span>Xếp Hạng</span>
                                        <FaCaretDown />
                                    </span>
                                    <div className={
                                        'HeaderComponent__Bottom__nav__container__List__Item__Bottom'
                                    }
                                        style={{ display: text === 'XepHang' && window.innerWidth < 992 ? "grid" : "" }}
                                    >
                                        <HeaderItemContent />
                                    </div>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <NavLink to="/the-loai" className='HeaderComponent__Bottom__nav__container__List__Item__Top'>Tìm Truyện</NavLink>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <NavLink to="/the-loai" className='HeaderComponent__Bottom__nav__container__List__Item__Top'>Lịch Sử</NavLink>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <NavLink to="/the-loai" className='HeaderComponent__Bottom__nav__container__List__Item__Top'>Theo Dõi</NavLink>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <NavLink to="/the-loai" className='HeaderComponent__Bottom__nav__container__List__Item__Top'>Thảo Luận</NavLink>
                                </li>
                                <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                    <a className='HeaderComponent__Bottom__nav__container__List__Item__Top' href='/' >Fanpage</a>
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

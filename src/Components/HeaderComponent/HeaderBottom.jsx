import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCaretDown } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './HeaderComponent.scss'
import { Button, Image, Modal } from 'react-bootstrap';
import { HeaderItemContent } from './HeaderItemContent';
import { ButtonLoginSignin } from '../ButtonLoginSignin/ButtonLoginSignin';
import User from '../../public/images/user.png'

import { FormLoginSigninComponent } from '../FormLoginSigninComponent/FormLoginSigninComponent';
import { ControlUserComponent } from '../ControlUserComponent/ControlUserComponent';
import { useQuery } from '@tanstack/react-query';
import { GetAllTheLoaiService } from '../../services/TruyenService';
import { useSelector } from 'react-redux';

export const HeaderBottom = ({ isDarkMode }) => {

    const user = useSelector(state => state?.user);


    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [isFormNow, setisFormNow] = useState('');

    const [dataTheloais, setDataTheloais] = useState([]);


    const [showForm, setShowForm] = useState(false);

    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = (e) => {

        setisFormNow(e.target.id)

        setShowForm(true)
    };

    const toggleContent = (newText) => {
        setIsOpen((prev) => !prev);

        setText(() => (isOpen ? '' : newText));
    };

    const Theloais = useQuery({
        queryKey: ['GetAllTheLoai', { page: '', limit: '', search: '' }],
        queryFn: async ({ queryKey }) => {
            const [, { page, limit, search }] = queryKey;
            const response = await GetAllTheLoaiService({ page, limit, search });
            return response;
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (Theloais?.data) {
            setDataTheloais(Theloais?.data?.data)
        }
    }, [Theloais]);

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

        <>
            <div className='HeaderComponent__Bottom'>
                <Navbar className='HeaderComponent__Bottom__nav' collapseOnSelect expand="lg" >
                    <div className='HeaderComponent__Bottom__nav__container'>
                        <a className='HeaderComponent__Bottom__nav__container__Logo' href="/">Trang Chủ</a>
                        <Navbar.Toggle style={{ backgroundColor: isDarkMode ? '#fff' : '', marginRight: '20px' }} aria-controls="responsive-navbar-nav" />
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
                                            <HeaderItemContent dataTheloais={dataTheloais} />
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
                                            <HeaderItemContent data={[]} />
                                        </div>
                                    </li>
                                    <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                        <NavLink to="/guest/truyen-moi-cap-nhat" className='HeaderComponent__Bottom__nav__container__List__Item__Top'>Tìm Truyện</NavLink>
                                    </li>
                                    <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                        <NavLink to="/user/lich-su" className='HeaderComponent__Bottom__nav__container__List__Item__Top'>Lịch Sử</NavLink>
                                    </li>
                                    <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                        <NavLink to="/user/truyen-dang-theo-doi" className='HeaderComponent__Bottom__nav__container__List__Item__Top'>Theo Dõi</NavLink>
                                    </li>
                                    <li className='HeaderComponent__Bottom__nav__container__List__Item'>
                                        <a className='HeaderComponent__Bottom__nav__container__List__Item__Top' href='https://www.facebook.com/profile.php?id=61566114167887&ref=embed_page' >Fanpage</a>
                                    </li>
                                    <li className='Button__User'>
                                        {user.isLogin ? (
                                            <ControlUserComponent />

                                        ) : (
                                            <ButtonLoginSignin handleShowForm={handleShowForm} />
                                        )}
                                    </li>
                                </ul>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Navbar>
            </div>

            {/* Form đăng nhập */}
            <Modal centered show={showForm} onHide={handleCloseForm}>
                <FormLoginSigninComponent setisFormNow={setisFormNow} isFormNow={isFormNow} setShowForm={setShowForm} />
            </Modal>
        </>
    )
}

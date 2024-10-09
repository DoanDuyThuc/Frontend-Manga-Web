import React, { useEffect, useRef, useState } from 'react'
import { Image, Overlay, Popover } from 'react-bootstrap'

import User from '../../public/images/user.png'

import './ControlUserComponent.scss'
import { NavLink } from 'react-router-dom'


export const ControlUserComponent = () => {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    const handleClickOutside = (event) => {

        if (ref.current && !ref.current?.contains(event.target) && event.target.id !== 'imgUser') {
            setShow(false);
        }


    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='ControlUserComponent'>
            <span className='ControlUserComponent__UserName'>Thucdn04</span>
            <span onClick={handleClick} className='ControlUserComponent__Manager'>
                <Image id='imgUser' width={50} height={50} src={User} alt='user' />
            </span>

            <Overlay
                ref={ref}
                show={show}
                target={target}
                placement="bottom"
                containerPadding={20}
            >
                <Popover className="popover-user">
                    <ul className='popover-user__list'>
                        <li className='popover-user__list__item'>
                            <NavLink to='/user/truyen-dang-theo-doi'>Danh sách theo dõi</NavLink>
                        </li>
                        <li className='popover-user__list__item'>
                            <NavLink to='/user/lich-su'>Lịch sử đọc truyện</NavLink>
                        </li>
                        <li className='popover-user__list__item'>
                            <NavLink to='/user/quan-ly-tai-khoan'>Cài đặt thông tin</NavLink>
                        </li>
                        <li className='popover-user__list__item'>
                            <NavLink to='/logout'>Đăng xuất</NavLink>
                        </li>
                    </ul>
                </Popover>
            </Overlay>
        </div>
    )
}

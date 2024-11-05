import React, { useEffect, useRef, useState } from 'react'
import { Image, Overlay, Popover } from 'react-bootstrap'

import User from '../../public/images/user.png'

import './ControlUserComponent.scss'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { LogoutService } from '../../services/UserService'
import { toast } from 'react-toastify'
import { clearUser } from '../../redux/user/userSlice'


export const ControlUserComponent = () => {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const dispatch = useDispatch();
    const user = useSelector(state => state?.user);

    // mutations
    const mutation = useMutation({
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

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };

    const handleClickOutside = (event) => {

        if (ref.current && !ref.current?.contains(event.target) && event.target.id !== 'imgUser') {
            setShow(false);
        }


    };

    const handleLogout = async () => {
        await mutation.mutateAsync();
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='ControlUserComponent'>
            <span className='ControlUserComponent__UserName'>{user.username}</span>
            <span onClick={handleClick} className='ControlUserComponent__Manager'>
                <Image loading='lazy' id='imgUser' width={50} height={50}
                    crossOrigin='anonymous'
                    src={user.avatar !== null ?
                        `${process.env.REACT_APP_DB_HOST}/public/${user.avatar}` :
                        User} alt='user' />
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
                        {/* admin */}
                        {user?.role === 'admin' && (
                            <li className='popover-user__list__item'>
                                <NavLink to='/admin/quan-ly-tai-khoan'>Quản lý web (dành cho admin)</NavLink>
                            </li>
                        )}
                        {/* authors */}
                        {user?.role === 'author' || user?.role === 'admin' ? (
                            <li className='popover-user__list__item'>
                                <NavLink to='/author/dang-truyen'>Quản lý Truyện (dành cho tác giả)</NavLink>
                            </li>
                        ) : ''}
                        <li className='popover-user__list__item'>
                            <NavLink onClick={handleLogout} to='/'>Đăng xuất</NavLink>
                        </li>
                    </ul>
                </Popover>
            </Overlay>
        </div>
    )
}

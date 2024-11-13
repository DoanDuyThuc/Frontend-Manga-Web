import React, { useEffect, useRef, useState } from 'react'
import { Badge, Button, Image, Modal, Overlay, Popover } from 'react-bootstrap'

import User from '../../public/images/user.png'

import './ControlUserComponent.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LogoutService } from '../../services/UserService'
import { toast } from 'react-toastify'
import { clearUser } from '../../redux/user/userSlice'
import { FaBell } from 'react-icons/fa'
import { TiDelete } from "react-icons/ti";
import { formatDistanceStrict, set } from 'date-fns';
import { vi } from 'date-fns/locale';

import { GetAllCommentOfUserService, UpdateStatusCommentOfUserService } from '../../services/HomeService'


export const ControlUserComponent = () => {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [showThongBao, setShowThongBao] = useState(false);
    const [dataCommentOfUser, setDataCommentOfUser] = useState([]);

    const handleCloseThongBao = () => setShowThongBao(false);

    const dispatch = useDispatch();
    const user = useSelector(state => state?.user);

    //query
    const { data } = useQuery({
        queryKey: ['Get-CommentOfUser', user.token, user.userId],
        queryFn: async ({ queryKey }) => {
            const [, token, userId] = queryKey;
            const res = await GetAllCommentOfUserService({ token, userId });
            return res;
        },
        enabled: !!user.userId,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

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

    const mutationUpdateIsRead = useMutation({
        mutationFn: UpdateStatusCommentOfUserService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-CommentOfUser');
            const previousValue = queryClient.getQueryData('Get-CommentOfUser');
            queryClient.setQueryData('Get-CommentOfUser', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {

        },
        onSettled: () => {
            queryClient.invalidateQueries('Get-CommentOfUser');
        },
        onError: (error) => {
            toast.error(`🐉 ${error}`, {
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
    })

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

    useEffect(() => {
        if (data) {
            setDataCommentOfUser(data.data);
        }
    }, [data])

    //handle
    const handleNavigateTruyen = async (item) => {
        navigate(`/guest/truyen-tranh/${item.Truyen.truyen_ma}?read=${item.id}`);
        await mutationUpdateIsRead.mutateAsync({
            token: user.token,
            comment_id: item.id,
            IsRead: true
        });
        setShowThongBao(false);
    }

    const handleDeleteThongBao = async (e, item) => {
        e.stopPropagation();
        await mutationUpdateIsRead.mutateAsync({
            token: user.token,
            comment_id: item.id,
            IsShow: false,
            IsRead: true
        });
    }

    return (
        <>
            <div className='ControlUserComponent'>

                <Button onClick={() => setShowThongBao(true)} variant='' className='ControlUserComponent__bell'>
                    <FaBell />
                    <Badge
                        style={{ position: 'absolute' }}
                        pill
                        bg="danger">{dataCommentOfUser.filter(item => item.IsRead === false).length}</Badge>
                    <span className="visually-hidden">unread messages</span>
                </Button>

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

            <Modal centered show={showThongBao} onHide={handleCloseThongBao}>
                <div className='ModalThongBao'>
                    <div className='ModalThongBao__content'>
                        <div style={{ padding: '0 1.25rem' }}>
                            <h4 >Thông báo</h4>
                            <span >Thông báo Từ Admin hoặc phản hồi của độc giả về tác phẩm của bạn (nếu bạn là 1 tác giả truyện) .</span>
                        </div>

                        <ul className='ModalThongBao__content__list'>
                            {dataCommentOfUser.length > 0 && dataCommentOfUser.filter(item => item.IsShow === true).map((item, index) => (
                                <li onClick={() => handleNavigateTruyen(item)} style={{ backgroundColor: item.IsRead ? '' : '#e9e9e9' }} key={item.id} className='ModalThongBao__content__list__item'>
                                    <div className='ModalThongBao__content__list__item__holdLeftMid'>

                                        <div className='ModalThongBao__content__list__item__holdLeftMid__left'>
                                            <Image
                                                roundedCircle
                                                width={50}
                                                height={50}
                                                crossOrigin='anonymous'
                                                src={item.User.avatar === null ?
                                                    User :
                                                    `${process.env.REACT_APP_DB_HOST}/public/${item.User.avatar}`
                                                }
                                                alt='user'
                                            />
                                        </div>

                                        <div className='ModalThongBao__content__list__item__holdLeftMid__mid'>
                                            <span className='ModalThongBao__content__list__item__holdLeftMid__mid__text'>từ : {item.User.username} - {formatDistanceStrict(new Date(item.createdAt), new Date(), { addSuffix: true, locale: vi })} - {item.Truyen.truyen_ten}</span>

                                            <span className='ModalThongBao__content__list__item__holdLeftMid__mid__text'>
                                                {item.content}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='ModalThongBao__content__list__item__right'>
                                        <span onClick={(e) => handleDeleteThongBao(e, item)}>
                                            <TiDelete size={20} color='red' />
                                        </span>
                                    </div>
                                </li>
                            ))}

                            {dataCommentOfUser.length > 0 && dataCommentOfUser.filter(item => item.IsShow === true).length === 0 && (
                                <li style={{ textAlign: 'center', marginTop: '40px', color: 'red' }} >
                                    <h4>Không có thông báo mới</h4>
                                </li>
                            )}

                        </ul>

                    </div>
                </div>
            </Modal>
        </>
    )
}

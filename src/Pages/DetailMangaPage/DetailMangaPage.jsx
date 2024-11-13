import React, { useEffect, useRef, useState } from 'react'

import './DetailMangaPage.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaUser, FaHeart, FaRegEye, FaThList } from "react-icons/fa";
import { AiFillFire, AiFillLike } from "react-icons/ai";
import { IoMdText } from "react-icons/io";
import { FaBook } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom';
import { GetTruyenService } from '../../services/TruyenService';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import { CommentComponent } from '../../Components/CommentComponent/CommentComponent';
import { AddFollowTruyenService, UpdateLuotXemService } from '../../services/HomeService';
import { toast } from 'react-toastify';

export const DetailMangaPage = () => {

    const location = useLocation();

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const hasVisitedRef = useRef(false);

    const [isShowMore, setIsShowMore] = useState(false);
    const [dataTruyen, setDataTruyen] = useState([]);
    const { truyen_ma } = useParams();
    const user = useSelector(state => state.user);

    //query
    const { data } = useQuery({
        queryKey: ['GetTruyen', truyen_ma],
        queryFn: async ({ queryKey }) => {
            const [, truyen_ma] = queryKey;
            const res = await GetTruyenService({ truyen_ma });
            return res;
        },
        enabled: !!truyen_ma,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    //mutation

    const mutationAddFollowTruyen = useMutation({
        mutationFn: AddFollowTruyenService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-Follow');
            const previousValue = queryClient.getQueryData('Get-Follow');
            queryClient.setQueryData('Get-Follow', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {
            if (!data.error) {
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
        onSettled: () => {
            queryClient.invalidateQueries('Get-Follow');
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

    const mutationUpdateLuotXem = useMutation({
        mutationFn: UpdateLuotXemService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetTruyen');
            const previousValue = queryClient.getQueryData('GetTruyen');
            queryClient.setQueryData('GetTruyen', (old) => {
                return old;
            });
            return previousValue;
        },
        onSettled: () => {
            queryClient.invalidateQueries('GetTruyen');
        },
        onError: (error) => {
        },
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (data) {
            setDataTruyen(data.data)
        }
    }, [data])

    useEffect(() => {
        if (!hasVisitedRef.current && dataTruyen.length !== 0) {
            handleUpdateLuotXem();
            hasVisitedRef.current = true;
        }
    }, [location.pathname, dataTruyen]);


    const handleUpdateLuotXem = async () => {
        await mutationUpdateLuotXem.mutateAsync({ truyen_id: dataTruyen?.id });
    }

    //handle
    const handleFollowTruyen = async () => {

        if (!user.isLogin) {
            toast.error(`🐉 Bạn cần đăng nhập để thực hiện chức năng này`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        } else {
            await mutationAddFollowTruyen.mutateAsync({ token: user.token, truyen_id: dataTruyen?.id, user_id: user.userId });
            navigate(`/user/truyen-dang-theo-doi`);
        }
    }

    const handleIsShowMore = () => {
        setIsShowMore(!isShowMore);
    }

    return (
        <div className='DetailMangaPage'>
            <div className='DetailMangaPage__main'>
                <ol>
                    <li>
                        <NavLink to='/'>Trang Chủ</NavLink>
                    </li>
                    <span>/</span>
                    <li>
                        <NavLink to={`/guest/truyen-tranh/${dataTruyen?.truyen_ma}`}>{dataTruyen?.truyen_ma}</NavLink>
                    </li>
                </ol>

                <div className='DetailMangaPage__main__info'>

                    <div className='DetailMangaPage__main__info__Avartar'>

                        <img
                            loading='lazy'
                            crossOrigin='anonymous'
                            src={`${process.env.REACT_APP_DB_HOST}/public${dataTruyen?.truyen_hinhanhdaidien}`}
                            alt='one-piece'
                        />
                    </div>
                    <div className='DetailMangaPage__main__info__other'>
                        <h1>{dataTruyen?.truyen_ten}</h1>
                        <div className='DetailMangaPage__main__info__other__content'>
                            <ul>
                                <li className='DetailMangaPage__main__info__other__content__item'>
                                    <Row>
                                        <Col lg={3} md={3} sm={3}>
                                            <p className='DetailMangaPage__main__info__other__content__item__left'>
                                                <MdOutlineDriveFileRenameOutline />
                                                <span>Tên khác</span>
                                            </p>
                                        </Col>
                                        <Col lg={9} md={9} sm={9}>
                                            <h2 className='DetailMangaPage__main__info__other__content__item__right' style={{ fontSize: '15px', fontWeight: 'lighter' }} >{dataTruyen?.truyen_ma}</h2>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='DetailMangaPage__main__info__other__content__item'>
                                    <Row>
                                        <Col lg={3} md={3} sm={3}>
                                            <p className='DetailMangaPage__main__info__other__content__item__left'>
                                                <FaUser />
                                                <span>Tác giả</span>
                                            </p>
                                        </Col>
                                        <Col lg={9} md={9} sm={9}>
                                            <p className='DetailMangaPage__main__info__other__content__item__right'>{dataTruyen?.truyen_tacgia}</p>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='DetailMangaPage__main__info__other__content__item'>
                                    <Row>
                                        <Col lg={3} md={3} sm={3}>
                                            <p className='DetailMangaPage__main__info__other__content__item__left'>
                                                <AiFillFire />
                                                <span>Tình trạng</span>
                                            </p>
                                        </Col>
                                        <Col lg={9} md={9} sm={9}>
                                            <p className='DetailMangaPage__main__info__other__content__item__right'>Chưa hoàn thành</p>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='DetailMangaPage__main__info__other__content__item'>
                                    <Row>
                                        <Col lg={3} md={3} sm={3}>
                                            <p className='DetailMangaPage__main__info__other__content__item__left'>
                                                <AiFillLike />
                                                <span>Lượt thích</span>
                                            </p>
                                        </Col>
                                        <Col lg={9} md={9} sm={9}>
                                            <p className='DetailMangaPage__main__info__other__content__item__right'>{dataTruyen?.truyen_luotthich}</p>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='DetailMangaPage__main__info__other__content__item'>
                                    <Row>
                                        <Col lg={3} md={3} sm={3}>
                                            <p className='DetailMangaPage__main__info__other__content__item__left'>
                                                <FaHeart />
                                                <span>Lượt theo dõi</span>
                                            </p>
                                        </Col>
                                        <Col lg={9} md={9} sm={9}>
                                            <p className='DetailMangaPage__main__info__other__content__item__right'>{dataTruyen?.truyen_luottheodoi}</p>
                                        </Col>
                                    </Row>
                                </li>
                                <li className='DetailMangaPage__main__info__other__content__item'>
                                    <Row>
                                        <Col lg={3} md={3} sm={3}>
                                            <p className='DetailMangaPage__main__info__other__content__item__left'>
                                                <FaRegEye />
                                                <span>Lượt xem</span>
                                            </p>
                                        </Col>
                                        <Col lg={9} md={9} sm={9}>
                                            <p className='DetailMangaPage__main__info__other__content__item__right'>{dataTruyen?.truyen_luotxem}</p>
                                        </Col>
                                    </Row>
                                </li>
                            </ul>
                        </div>

                        <ul className='DetailMangaPage__main__info__other__listType'>
                            {dataTruyen?.TheLoais && dataTruyen?.TheLoais.length > 0 ? dataTruyen?.TheLoais.map((item, index) => (
                                <li key={item.id}>
                                    <NavLink to='/guest/truyen-tranh/one-piece'>{item.ten_theloai}</NavLink>
                                </li>
                            )) : <p>Chưa có thể loại</p>}
                        </ul>

                        <ul className='DetailMangaPage__main__info__other__menuStory'>
                            <li>
                                <NavLink
                                    className={dataTruyen?.Chuongs && dataTruyen?.Chuongs.length !== 0 ? '' : 'Isdisabled'}
                                    style={{ backgroundColor: '#8bc34a' }}

                                    to={`/guest/truyen-tranh/${dataTruyen?.truyen_ma}/${dataTruyen?.Chuongs && dataTruyen?.Chuongs.length !== 0 && dataTruyen?.Chuongs[0].TruyenId}/${dataTruyen?.Chuongs && dataTruyen?.Chuongs.length !== 0 && dataTruyen?.Chuongs[0].Chuong_so}`}
                                >
                                    <FaBook />
                                    <span>Đọc từ đầu</span>
                                </NavLink>
                            </li>
                            <li>
                                <button onClick={() => handleFollowTruyen()} style={{ backgroundColor: '#ff3860' }} >
                                    <FaHeart />
                                    <span>Theo dõi</span>
                                </button>
                            </li>
                            <li>
                                <NavLink style={{ backgroundColor: '#bd10e0' }} to='/guest/truyen-tranh/one-piece'>
                                    <AiFillLike />
                                    <span>Thích</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='DetailMangaPage__main__introduce'>
                    <h3>
                        <IoMdText />
                        <span>Giới thiệu</span>
                    </h3>

                    <motion.div
                        style={{ height: isShowMore ? '100%' : '60px' }} className='DetailMangaPage__main__introduce__content'
                        initial={{ height: '60px' }}
                        animate={{ height: isShowMore ? '100%' : '60px' }}
                        transition={{ duration: 0.5 }}
                    >
                        <p >
                            {dataTruyen?.truyen_motangan}
                        </p>
                    </motion.div>

                    <div className='DetailMangaPage__main__introduce__toggle'>
                        <button onClick={handleIsShowMore}>
                            {isShowMore ? 'Thu gọn' : 'Xem thêm'}
                        </button>
                    </div>
                </div>

                <div className='DetailMangaPage__main__menuChapter'>
                    <h3>
                        <FaThList />
                        <span>Danh sách chương</span>
                    </h3>
                    <div className='DetailMangaPage__main__menuChapter__list'>
                        <div className='DetailMangaPage__main__menuChapter__list__listContent'>
                            {dataTruyen?.Chuongs && dataTruyen?.Chuongs.length > 0 ? dataTruyen?.Chuongs.map((item, index) => (
                                <div key={item.id} className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                    <Row>
                                        <Col lg={8}>
                                            <NavLink
                                                className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                                to={`/guest/truyen-tranh/${dataTruyen?.truyen_ma}/${item.TruyenId}/${item.Chuong_so}`}
                                            >
                                                Chapter {item.Chuong_so}: {item.Chuong_ten}
                                            </NavLink>
                                        </Col>
                                        <Col lg={4}>
                                            <p
                                                className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                            >
                                                {format(new Date(item.createdAt), 'dd/MM/yyyy')}
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            )) : <p>Chưa có chương nào</p>}
                        </div>
                    </div>
                </div>


                <div>
                    <CommentComponent truyenId={dataTruyen.id} />
                </div>
            </div>
        </div >
    )
}

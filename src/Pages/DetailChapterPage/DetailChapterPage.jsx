import React, { useRef } from 'react'
import './DetailChapterPage.scss'
import { MdError } from 'react-icons/md'
import { BiSolidErrorAlt } from 'react-icons/bi'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { CommentComponent } from '../../Components/CommentComponent/CommentComponent'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns';
import { AddLichSuTruyenService, GetChuongHomeService } from '../../services/HomeService'
import { useSelector } from 'react-redux'

export const DetailChapterPage = () => {

    const { truyen_ma, TruyenId, ChuongId } = useParams();
    const user = useSelector(state => state.user);

    const queryClient = useQueryClient();

    const location = useLocation();

    const [dataChuong, setDataChuong] = useState({});
    const [isTimedOut, setIsTimedOut] = useState(false);

    const hasVisitedRef = useRef(false);

    const { data } = useQuery({
        queryKey: ['GetChuong', { TruyenId, ChuongId }],
        queryFn: async ({ queryKey }) => {
            const [, { TruyenId, ChuongId }] = queryKey;
            const response = await GetChuongHomeService({ truyenid: TruyenId, chuongid: ChuongId });
            return response;
        },
        enabled: !!TruyenId || !!ChuongId,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    //mutation
    const mutationAddLichSuTruyen = useMutation({
        mutationFn: AddLichSuTruyenService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-history');
            const previousValue = queryClient.getQueryData('Get-history');
            queryClient.setQueryData('Get-history', (old) => {
                return old;
            });
            return previousValue;
        },
        onSettled: () => {
            queryClient.invalidateQueries('Get-history');
        },
        onError: (error) => {
        },
    });

    useEffect(() => {
        if (data) {
            setDataChuong(data?.data);
        }
    }, [data])

    useEffect(() => {
        window.scrollBy({
            top: -window.scrollY,
            left: 0,
            behavior: 'smooth'
        });
    }, [ChuongId]);

    useEffect(() => {
        if (!hasVisitedRef.current) {
            handleAddHistory();
            hasVisitedRef.current = true;
        }
    }, [location.pathname]);

    const handleAddHistory = async () => {
        if (user?.isLogin && user.token !== '') {
            await mutationAddLichSuTruyen.mutateAsync({ token: user.token, truyen_id: TruyenId, user_id: user.userId });
            setIsTimedOut(false);
        }
    };

    const time = dataChuong?.updatedAt;
    let timeAgo = "Invalid date";

    if (time) {
        try {
            timeAgo = format(new Date(time), 'dd/MM/yyyy');
        } catch (error) {
            console.error("Error formatting date:", error);
        }
    }

    return (
        <div className='DetailChapterPage'>
            <div className='DetailChapterPage__Hold'>

                <div className='DetailChapterPage__Hold__Control'>
                    <div>
                        <ol className='DetailChapterPage__Hold__Control__path'>
                            <li>
                                <NavLink to='/'>Trang chủ</NavLink>
                            </li>
                            /
                            <li>
                                <NavLink to={`/guest/truyen-tranh/${truyen_ma}`}>{truyen_ma}</NavLink>
                            </li>
                            /
                            <li>
                                <NavLink to={`/guest/truyen-tranh/${truyen_ma}/${dataChuong?.id}`}>Chap {dataChuong?.Chuong_so}</NavLink>
                            </li>
                        </ol>
                    </div>

                    <div className='DetailChapterPage__Hold__Control__Title'>
                        <h1>
                            <NavLink style={{ textDecoration: 'none', color: '#000' }} to={`/guest/truyen-tranh/${truyen_ma}`}>{dataChuong?.Chuong_ten}</NavLink>
                            - <span>Chapter {dataChuong?.Chuong_so}</span>
                        </h1>

                        <time dateTime={time}>(Cập nhật lúc: {timeAgo})</time>
                    </div>

                    <div className='DetailChapterPage__Hold__Control__Server'>
                        <div className='DetailChapterPage__Hold__Control__Server__convert'>
                            <span>Nếu không xem được truyện vui lòng đổi "SERVER HÌNH" bên dưới</span>
                            <div className='DetailChapterPage__Hold__Control__Server__convert__btn'>
                                <NavLink to='/'>Server 1</NavLink>
                            </div>
                        </div>

                        <div className='DetailChapterPage__Hold__Control__Server__rperror'>
                            <NavLink to='/'>
                                <MdError />
                                Báo Lỗi Chương
                            </NavLink>
                        </div>
                    </div>

                    <div className='DetailChapterPage__Hold__Control__Server__AlertInfo'>
                        <BiSolidErrorAlt />
                        <em>Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter</em>
                    </div>

                    <div className='DetailChapterPage__Hold__Control__Server__navigate'>
                        <NavLink
                            className={ChuongId === '1' ? 'Isdisabled' : ''}
                            to={`/guest/truyen-tranh/${truyen_ma}/${TruyenId}/${Number(ChuongId - 1)}`}
                        >
                            <FaArrowLeft />
                            <span>Chap trước</span>
                        </NavLink>
                        <NavLink
                            className={Number(ChuongId) === data?.ChuongLength ? 'Isdisabled' : ''}
                            to={`/guest/truyen-tranh/${truyen_ma}/${TruyenId}/${Number(ChuongId) + 1}`}
                        >
                            <span> Chap sau</span>
                            <FaArrowRight />
                        </NavLink>
                    </div>
                </div>

                <div className='DetailChapterPage__Hold__Content'>
                    <div style={{ overflow: 'hidden' }}>
                        {dataChuong?.chuong_hinhanhs && dataChuong?.chuong_hinhanhs.length > 0 ?
                            dataChuong?.chuong_hinhanhs.sort((a, b) => a.sort_order - b.sort_order).map((item, index) => (
                                <div key={index} className='DetailChapterPage__Hold__Content__chapter'>
                                    <img loading='lazy'
                                        crossOrigin='anonymous'
                                        className='DetailChapterPage__Hold__Content__chapter__img lazy'
                                        src={`${process.env.REACT_APP_DB_HOST}/public${item?.chuong_hinhanh_link}`}
                                        alt="ảnh"
                                    />
                                </div>

                            )) : (
                                <p >Chưa có nội dung truyện</p>
                            )}

                    </div>
                </div>

                <div className='DetailChapterPage__Hold__Control'>
                    <div className='DetailChapterPage__Hold__Control__Server__navigate'>
                        <NavLink
                            className={ChuongId === '1' ? 'Isdisabled' : ''}
                            to={`/guest/truyen-tranh/${truyen_ma}/${TruyenId}/${Number(ChuongId - 1)}`}
                        >
                            <FaArrowLeft />
                            <span>Chap trước</span>
                        </NavLink>
                        <NavLink
                            className={Number(ChuongId) === data?.ChuongLength ? 'Isdisabled' : ''}
                            to={`/guest/truyen-tranh/${truyen_ma}/${TruyenId}/${Number(ChuongId) + 1}`}
                        >
                            <span> Chap sau</span>
                            <FaArrowRight />
                        </NavLink>
                    </div>

                    <div>
                        <ol className='DetailChapterPage__Hold__Control__path'>
                            <li>
                                <NavLink to='/'>Trang chủ</NavLink>
                            </li>
                            /
                            <li>
                                <NavLink to='/'>One Piece</NavLink>
                            </li>
                            /
                            <li>
                                <NavLink to='/'>Chap 1</NavLink>
                            </li>
                        </ol>
                    </div>

                </div>

                <div className='DetailChapterPage__Hold__Comment'>
                    <CommentComponent />
                </div>
            </div>
        </div>
    )
}

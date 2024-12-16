import React, { useEffect, useState } from 'react'
import './HomePage.scss'
import SliderHomeComponent from '../../Components/SliderHomeComponent/SliderHomeComponent'
import { ListHomePageComponent } from '../../Components/ListHomePageComponent/ListHomePageComponent'
import { useQuery } from '@tanstack/react-query'
import { GetTruyenHomeService } from '../../services/HomeService'
import { useDispatch, useSelector } from 'react-redux'
import { setHomeTruyens } from '../../redux/home/homeSlice'
import { Modal } from 'react-bootstrap'

export const HomePage = () => {

    const home = useSelector(state => state.home)
    const dispatch = useDispatch()

    const [showForm, setShowForm] = useState(true)

    const handleCloseForm = () => setShowForm(false)

    const [searchBtn, setSearchBtn] = useState('')

    const { data } = useQuery({
        queryKey: ['getAllTruyen-Home', {
            page: home?.truyenPanigate.page,
            limit: home?.limit,
            search: searchBtn,
            quoc_gia: '',
            isOver: '',
            typeManga: '',
            soLuongChuong: ''
        }],
        queryFn: async ({ queryKey }) => {
            const [, { page, limit, search, quoc_gia, isOver, typeManga, soLuongChuong }] = queryKey;
            const res = await GetTruyenHomeService({ page, limit, search, quoc_gia, isOver, typeManga, soLuongChuong });
            return res;
        },
        enabled: !!home?.truyenPanigate.page || !!home?.limit || !!searchBtn,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (data) {
            dispatch(setHomeTruyens(data))
        }
    }, [data, dispatch])

    return (
        <div className='HomePage'>
            <SliderHomeComponent dataTruyens={[...home.truyens].sort((a, b) => b.truyen_luotxem - a.truyen_luotxem)} />
            <ListHomePageComponent dataTruyens={home.truyens} />

            {/* Form đăng nhập */}
            <Modal centered show={showForm} onHide={handleCloseForm}>
                <div className='Modal_ThongBao'>
                    <h2>Lưu Ý !!!</h2>
                    <p>- Trang Web không hề có mục đích thương mại hoặc sao chép cho mục đích kiếm tiền.</p>
                    <br />
                    <p>- Trang Web này sinh ra nhắm mục đích học tập và luyện tập của tôi.</p>
                    <br />
                    <p>- Nguồn trang Web tham khảo từ <a href='https://truyenqqto.com/' style={{ color: "#f18121" }}> truyenqqto.com.</a></p>
                    <br />
                    <p>- Liên hệ với tôi qua FanpageL: <a href="https://www.facebook.com/profile.php?id=61566114167887&ref=embed_page">Tập Code</a> hoặc FB: <a href="https://www.facebook.com/profile.php?id=100009350209129">Đoàn Thức</a>.</p>

                    <div className='Modal_ThongBao__btn'>
                        <button onClick={handleCloseForm}>Đã Hiểu</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
import React, { useEffect, useState } from 'react'
import { MdOutlineWindPower } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { ListSelecterFilterTypeManga } from '../../Config/ConfigListSelecter';


import './ListMangaPage.scss'
import { Button, Col, Container, Pagination, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { CartItemComponent } from '../../Components/CartItemComponent/CartItemComponent';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { GetTruyenHomeService } from '../../services/HomeService';
import { PaginationComponent } from '../../Components/PanigateComponent/PanigateComponent';
import { setHomePanigateTruyen, setHomeTruyens } from '../../redux/home/homeSlice';
import { GetAllTheLoaiService } from '../../services/TruyenService';

export const ListMangaPage = () => {

    const home = useSelector(state => state.home);
    const dispatch = useDispatch();

    const location = useLocation();
    const searchTerm = new URLSearchParams(location.search).get('search');
    const searchTheloai = new URLSearchParams(location.search).get('searchTheLoai');

    const [quocGia, setQuocGia] = useState('');
    const [tinhTrang, setTinhTrang] = useState('');
    const [typeManga, setTypeManga] = useState([]);

    const { data } = useQuery({
        queryKey: ['getAllTruyen-Home', {
            page: home?.truyenPanigate.page,
            limit: home?.limit,
            search: searchTerm === null ? '' : searchTerm,
            quoc_gia: quocGia === '' ? '' : quocGia,
            isOver: tinhTrang === '' ? '' : tinhTrang,
            typeManga: typeManga.length === 0 ? '' : typeManga,
        }],
        queryFn: async ({ queryKey }) => {
            const [, { page, limit, search, quoc_gia, isOver, typeManga }] = queryKey;
            const res = await GetTruyenHomeService({ page, limit, search, quoc_gia, isOver, typeManga });
            return res;
        },
        enabled: !!home?.truyenPanigate.page || !!home?.limit || !!searchTerm || !!quocGia || !!tinhTrang,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })


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
        if (data) {
            dispatch(setHomeTruyens(data))
            window.scrollTo(0, 0);

            if (searchTheloai) {

                setTypeManga([Number(searchTheloai)]);
            }
        }
    }, [data, dispatch, searchTheloai])


    const { Formik } = formik;

    const schema = yup.object().shape({

    });

    //handle 
    const handlePaginate = (pageNumber) => {
        dispatch(setHomePanigateTruyen(pageNumber));
    };

    return (
        <div className='ListMangaPage'>
            <div className='ListMangaPage__main'>
                <div className='ListMangaPage__main__tags'>
                    <h1>
                        <MdOutlineWindPower />
                        <p style={{ margin: 0 }}>Truyện Mới Cập Nhật</p>
                    </h1>
                </div>

                <div className='ListMangaPage__main__Filter'>

                    <div className='ListMangaPage__main__Filter__searchForm'>
                        <div className='ListMangaPage__main__Filter__searchForm__tutorial'>
                            <p>- Tích vào ô để chọn</p>
                            <p>- để trống nếu không chọn</p>
                        </div>

                        <div className='ListMangaPage__main__Filter__searchForm__reset'>
                            <a href="/guest/truyen-moi-cap-nhat">
                                <GrPowerReset />
                                <span>Reset</span>
                            </a>
                        </div>

                        <Formik
                            validationSchema={schema}
                            onSubmit={(values) => {
                                setQuocGia(values.QuocGia);
                                setTinhTrang(values.TinhTrang);
                                setTypeManga(values.TypeManga);
                            }}

                            initialValues={{
                                TypeManga: [],
                                QuocGia: '',
                                TinhTrang: '',
                            }}
                        >
                            {({ handleSubmit, setFieldValue, handleChange, values, touched, errors }) => (
                                <Form noValidate onSubmit={handleSubmit} >

                                    <div className='ListMangaPage__main__Filter__searchForm__TypeManga'>
                                        <div className='ListMangaPage__main__Filter__searchForm__TypeManga__lable'>
                                            Thể Loại Truyện
                                        </div>
                                        <Container fluid>
                                            <Row>
                                                {
                                                    Theloais?.data?.data.map((item, index) => {
                                                        return (
                                                            <Col lg={4} key={index}>
                                                                <Form.Group as={Col} lg="4" controlId="validationFormik01">
                                                                    <Form.Check
                                                                        inline
                                                                        label={item.ten_theloai}
                                                                        name="TypeManga"
                                                                        type="checkbox"
                                                                        id={`inline-checkbox-${item.id}`}
                                                                        value={item.id} // Giá trị của checkbox này
                                                                        onChange={(e) => {
                                                                            if (e.target.checked) {
                                                                                // Thêm giá trị vào mảng
                                                                                setFieldValue('TypeManga', [...values.TypeManga, Number(e.target.value)]);

                                                                            } else {
                                                                                // Xóa giá trị khỏi mảng
                                                                                setFieldValue('TypeManga', values.TypeManga.filter(item => item !== Number(e.target.value)));
                                                                            }

                                                                        }}
                                                                        checked={values.TypeManga.includes(item.id)}
                                                                    />
                                                                </Form.Group>
                                                            </Col>
                                                        )
                                                    })
                                                }
                                            </Row>

                                        </Container>
                                    </div>

                                    <div className='ListMangaPage__main__Filter__searchForm__InfoManga'>
                                        <Form.Group className='ListMangaPage__main__Filter__searchForm__InfoManga__Item' controlId="validationFormik01">
                                            <Form.Label>Quốc Gia</Form.Label>
                                            <Form.Select
                                                name='QuocGia'
                                                aria-label="Select Info Manga"
                                                value={values.QuocGia}
                                                onChange={handleChange}
                                            >
                                                <option value=''>Tất cả</option>
                                                <option value="vietnam">Việt Nam</option>
                                                <option value="trungquoc">Trung Quốc</option>
                                                <option value="hanquoc">Hàn Quốc</option>
                                                <option value="nhatban">Nhật Bản</option>
                                                <option value="my">Mỹ</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className='ListMangaPage__main__Filter__searchForm__InfoManga__Item' controlId="validationFormik01">
                                            <Form.Label>Tình Trạng</Form.Label>
                                            <Form.Select
                                                name='TinhTrang'
                                                aria-label="Select Info Manga"
                                                value={values.TinhTrang}
                                                onChange={handleChange}
                                            >
                                                <option value=''>Tất cả</option>
                                                <option value={true}>Đã Hoàn Thành</option>
                                                <option value={false}>Chưa Hoàn Thành</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>

                                    <div className='ListMangaPage__main__Filter__searchForm__Submit'>
                                        <button type='submit'>Tìm Kiếm</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>

                <div className='ListMangaPage__main__ListMangaPageGrid'>
                    <Container fluid>
                        <Row>
                            {home?.truyens.map((item, index) => (
                                <Col key={index} lg={2} md={3} sm={4} xs={6}>
                                    <CartItemComponent item={item} marginZero={true} deleted={false} />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>

                <div className='ListMangaPage__main__Panigate'>
                    <PaginationComponent
                        itemsPerPage={home?.limit}
                        totalItems={home?.truyenPanigate.totalItems}
                        totalPages={home.truyenPanigate.totalPages}
                        paginate={handlePaginate}
                        currentPage={home.truyenPanigate.page}
                    />
                </div>
            </div>
        </div>
    )
}

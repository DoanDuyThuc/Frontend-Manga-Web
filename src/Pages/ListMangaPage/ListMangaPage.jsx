import React from 'react'
import { MdOutlineWindPower } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { ListSelecterFilterTypeManga } from '../../Config/ConfigListSelecter';


import './ListMangaPage.scss'
import { Button, Col, Container, Pagination, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { CartItemComponent } from '../../Components/CartItemComponent/CartItemComponent';

export const ListMangaPage = () => {

    const { Formik } = formik;

    const schema = yup.object().shape({

    });

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
                            <a href="/truyen-moi-cap-nhat/1">
                                <GrPowerReset />
                                <span>Reset</span>
                            </a>
                        </div>

                        <Formik
                            validationSchema={schema}
                            onSubmit={(values) => {
                                console.log(values);
                            }}

                            initialValues={{
                                TypeManga: [],
                                QuocGia: '',
                                TinhTrang: '',
                                SoLuongChuong: 0,
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
                                                    ListSelecterFilterTypeManga.map((item, index) => {
                                                        return (
                                                            <Col lg={4} key={index}>
                                                                <Form.Group as={Col} lg="4" controlId="validationFormik01">
                                                                    <Form.Check
                                                                        inline
                                                                        label={item.lable}
                                                                        name="TypeManga"
                                                                        type="checkbox"
                                                                        id={`inline-checkbox-${item.value}`}
                                                                        value={item.value} // Giá trị của checkbox này
                                                                        onChange={(e) => {
                                                                            if (e.target.checked) {
                                                                                // Thêm giá trị vào mảng
                                                                                setFieldValue('TypeManga', [...values.TypeManga, e.target.value]);
                                                                            } else {
                                                                                // Xóa giá trị khỏi mảng
                                                                                setFieldValue('TypeManga', values.TypeManga.filter(item => item !== e.target.value));
                                                                            }
                                                                        }}
                                                                        checked={values.TypeManga.includes(item.value)}
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
                                                <option value="dahoanthanh">Đã Hoàn Thành</option>
                                                <option value="chuahoanthanh">Chưa Hoàn Thành</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </div>

                                    <div className='ListMangaPage__main__Filter__searchForm__InfoManga'>
                                        <Form.Group className='ListMangaPage__main__Filter__searchForm__InfoManga__Item' controlId="validationFormik01">
                                            <Form.Label>Số Lượng Chương</Form.Label>
                                            <Form.Select
                                                name='SoLuongChuong'
                                                aria-label="Select Info Manga"
                                                value={values.SoLuongChuong}
                                                onChange={handleChange}
                                            >
                                                <option value={0}>{'>'} 0</option>
                                                <option value={50}>{'>='} 50</option>
                                                <option value={100}>{'>='} 100</option>
                                                <option value={200}>{'>='} 200</option>
                                                <option value={300}>{'>='} 300</option>
                                                <option value={400}>{'>='} 400</option>
                                                <option value={500}>{'>='} 500</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <div className='ListMangaPage__main__Filter__searchForm__InfoManga__Item'>

                                        </div>
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
                            <Col lg={2} md={3} sm={4} xs={6}>
                                <CartItemComponent marginZero={true} />
                            </Col>

                            <Col lg={2} md={3} sm={4} xs={6}>

                                <CartItemComponent marginZero={true} />
                            </Col>

                            <Col lg={2} md={3} sm={4} xs={6}>

                                <CartItemComponent marginZero={true} />
                            </Col>

                            <Col lg={2} md={3} sm={4} xs={6}>

                                <CartItemComponent marginZero={true} />
                            </Col>

                            <Col lg={2} md={3} sm={4} xs={6}>

                                <CartItemComponent marginZero={true} />
                            </Col>

                            <Col lg={2} md={3} sm={4} xs={6}>

                                <CartItemComponent marginZero={true} />
                            </Col>

                            <Col lg={2} md={3} sm={4} xs={6}>

                                <CartItemComponent marginZero={true} />
                            </Col>

                        </Row>
                    </Container>
                </div>

                <div className='ListMangaPage__main__Panigate'>
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item active>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item >{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item disabled>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

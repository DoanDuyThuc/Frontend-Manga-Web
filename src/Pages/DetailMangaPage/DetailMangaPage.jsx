import React, { useState } from 'react'

import './DetailMangaPage.scss'
import { NavLink } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaUser, FaHeart, FaRegEye, FaThList } from "react-icons/fa";
import { AiFillFire, AiFillLike } from "react-icons/ai";
import { IoMdText } from "react-icons/io";
import { FaBook } from "react-icons/fa6";
import { motion } from 'framer-motion';

import { CommentComponent } from '../../Components/CommentComponent/CommentComponent';

export const DetailMangaPage = () => {

    const [isShowMore, setIsShowMore] = useState(false);

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
                        <NavLink to='/truyen-tranh/one-piece'>One Piece</NavLink>
                    </li>
                </ol>

                <div className='DetailMangaPage__main__info'>

                    <div className='DetailMangaPage__main__info__Avartar'>

                        <img src='https://static2.truyentranhonl.com/img-comic/dao-hai-tac.jpg' alt='one-piece' />
                    </div>
                    <div className='DetailMangaPage__main__info__other'>
                        <h1>One Piece</h1>
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
                                            <h2 className='DetailMangaPage__main__info__other__content__item__right' style={{ fontSize: '15px', fontWeight: 'lighter' }} >Vua Hải Tặc; Đảo Hải Tặc; OnePiece</h2>
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
                                            <p className='DetailMangaPage__main__info__other__content__item__right'>Eiichiro Oda</p>
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
                                            <p className='DetailMangaPage__main__info__other__content__item__right'>75880</p>
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
                                            <p className='DetailMangaPage__main__info__other__content__item__right'>211,461</p>
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
                                            <p className='DetailMangaPage__main__info__other__content__item__right'>458,349,002</p>
                                        </Col>
                                    </Row>
                                </li>
                            </ul>
                        </div>

                        <ul className='DetailMangaPage__main__info__other__listType'>
                            <li>
                                <NavLink to='/truyen-tranh/one-piece'>Action</NavLink>
                            </li>
                            <li>
                                <NavLink to='/truyen-tranh/one-piece'>Drama</NavLink>
                            </li>
                            <li>
                                <NavLink to='/truyen-tranh/one-piece'>Fantasy</NavLink>
                            </li>
                            <li>
                                <NavLink to='/truyen-tranh/one-piece'>Supernatural</NavLink>
                            </li>
                        </ul>

                        <ul className='DetailMangaPage__main__info__other__menuStory'>
                            <li>
                                <NavLink style={{ backgroundColor: '#8bc34a' }} to='/truyen-tranh/one-piece'>
                                    <FaBook />
                                    <span>Đọc từ đầu</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink style={{ backgroundColor: '#ff3860' }} to='/truyen-tranh/one-piece'>
                                    <FaHeart />
                                    <span>Theo dõi</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink style={{ backgroundColor: '#bd10e0' }} to='/truyen-tranh/one-piece'>
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
                            One Piece là câu truyện kể về Luffy và các thuyền viên của mình. Khi còn nhỏ, Luffy ước mơ trở thành Vua Hải Tặc. Cuộc sống của cậu bé thay đổi khi cậu vô tình có được sức mạnh có thể co dãn như cao su, nhưng đổi lại, cậu không bao giờ có thể bơi được nữa. Giờ đây, Luffy cùng những người bạn hải tặc của mình ra khơi tìm kiếm kho báu One Piece, kho báu vĩ đại nhất trên thế giới. Trong One Piece, mỗi nhân vật trong đều mang một nét cá tính đặc sắc kết hợp cùng các tình huống kịch tính, lối dẫn truyện hấp dẫn chứa đầy các bước ngoặt bất ngờ và cũng vô cùng hài hước đã biến One Piece trở thành một trong những bộ truyện nổi tiếng nhất không thể bỏ qua. Hãy đọc One Piece để hòa mình vào một thế giới của những hải tặc rộng lớn, đầy màu sắc, sống động và thú vị, cùng đắm chìm với những nhân vật yêu tự do, trên hành trình đi tìm ước mơ của mình.
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
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='DetailMangaPage__main__menuChapter__list__listContent__item'>
                                <Row>
                                    <Col lg={8}>
                                        <NavLink
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__text'
                                            to='/truyen-tranh/one-piece/1'
                                        >
                                            Chapter 1: Đảo Hải Tặc
                                        </NavLink>
                                    </Col>
                                    <Col lg={4}>
                                        <p
                                            className='DetailMangaPage__main__menuChapter__list__listContent__item__day'
                                        >
                                            10/10/2021
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>


                <CommentComponent />
            </div>
        </div>
    )
}

import React from 'react'
import { MdOutlineWindPower } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

import './ListHomePageComponent.scss'
import { Col, Container, Row } from 'react-bootstrap';
import { CartItemComponent } from '../CartItemComponent/CartItemComponent';
import { NavLink } from 'react-router-dom';

export const ListHomePageComponent = () => {
    return (
        <Container fluid className='ListHomePage'>
            <div className='ListHomePage__ListHomePageTags'>
                <h1>
                    <NavLink to='/tags'>
                        <MdOutlineWindPower />
                        <p style={{ margin: 0 }}>Truyện Mới Cập Nhật</p>
                    </NavLink>
                </h1>

                <div className='ListHomePage__ListHomePageTags__Sort'>
                    <NavLink to='/tags'>
                        <button>
                            <FaFilter />
                        </button>
                    </NavLink>
                </div>
            </div>
            <div className='ListHomePage__ListHomePageGrid'>
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
            </div>

            <div className='ListHomePage__ListHomePageSeeMore'>
                <NavLink to='/truyen-moi-cap-nhat/1'>Xem thêm nhiều truyện</NavLink>
            </div>
        </Container>
    )
}

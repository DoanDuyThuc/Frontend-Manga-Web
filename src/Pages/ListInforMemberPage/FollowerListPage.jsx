import React from 'react'
import './ListInforMemberPage.scss'
import { FaHeart } from 'react-icons/fa'
import { CartItemComponent } from '../../Components/CartItemComponent/CartItemComponent'
import { Col, Row } from 'react-bootstrap'

export const FollowerListPage = () => {
    return (
        <div className='ListInforMemberPage'>
            <div className='ListInforMemberPage__tags'>
                <h1>
                    <p>
                        <FaHeart />
                        <span>
                            Truyện Đang Theo Dõi
                        </span>
                    </p>
                </h1>
            </div>

            <div className='ListInforMemberPage__content'>
                <Row>
                    <Col lg={2} md={3} sm={4} xs={6}>
                        <CartItemComponent marginZero={true} deleted={true} />
                    </Col>
                    <Col lg={2} md={3} sm={4} xs={6}>
                        <CartItemComponent marginZero={true} deleted={true} />
                    </Col>
                    <Col lg={2} md={3} sm={4} xs={6}>
                        <CartItemComponent marginZero={true} deleted={true} />
                    </Col>
                    <Col lg={2} md={3} sm={4} xs={6}>
                        <CartItemComponent marginZero={true} deleted={true} />
                    </Col>
                    <Col lg={2} md={3} sm={4} xs={6}>
                        <CartItemComponent marginZero={true} deleted={true} />
                    </Col>
                    <Col lg={2} md={3} sm={4} xs={6}>
                        <CartItemComponent marginZero={true} deleted={true} />
                    </Col>
                    <Col lg={2} md={3} sm={4} xs={6}>
                        <CartItemComponent marginZero={true} deleted={true} />
                    </Col>
                </Row>

            </div>
        </div>
    )
}

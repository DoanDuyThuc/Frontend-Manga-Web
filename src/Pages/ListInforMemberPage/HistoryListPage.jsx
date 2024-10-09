import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaHistory } from 'react-icons/fa'
import { CartItemComponent } from '../../Components/CartItemComponent/CartItemComponent'

export const HistoryListPage = () => {
    return (
        <div className='ListInforMemberPage'>
            <div className='ListInforMemberPage__tags'>
                <h1>
                    <p>
                        <FaHistory />
                        <span>
                            Lịch Sử Đọc Truyện
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

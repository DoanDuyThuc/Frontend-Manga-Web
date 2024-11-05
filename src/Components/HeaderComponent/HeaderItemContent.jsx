import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const HeaderItemContent = ({ dataTheloais }) => {

    return (
        <div className='HeaderItemContent'>
            <Container>
                <Row>
                    {dataTheloais && dataTheloais.map((item, index) => (
                        <Col className='HeaderItemContent__item' xs={6} lg={2} key={index}>
                            <NavLink className='HeaderItemContent__item__text' to={`/guest/truyen-moi-cap-nhat?searchTheLoai=${item.id}`}>
                                {item.ten_theloai}
                            </NavLink>
                        </Col>
                    ))}

                </Row>
            </Container>
        </div>
    )
}

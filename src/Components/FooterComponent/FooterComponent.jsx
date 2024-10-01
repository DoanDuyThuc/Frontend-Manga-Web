import React, { useEffect } from 'react'
import './FooterComponent.scss'
import Logo from '../../public/images/logo1.png'
import { Col, Container, NavLink, Row } from 'react-bootstrap'

export const FooterComponent = () => {

    return (
        <Container fluid className='FooterComponent'>

            <div className='FooterComponent__middle'>

                <Row >
                    <Col lg={6} className='FooterComponent__middle__left'>
                        <a href='/'>
                            <img src={Logo} alt='logo' />
                        </a>
                        <p>
                            <iframe
                                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61566114167887&tabs=timeline&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                                width="340"
                                height="130"
                                style={{ border: 'none', overflow: 'hidden' }}
                                // allowfullscreen="true"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                        </p>
                    </Col>

                    <Col lg={6} className='FooterComponent__middle__right'>
                        <ul className='FooterComponent__middle__right__List'>
                            <li className='FooterComponent__middle__right__List__Item'>
                                <NavLink to='/'>Truyện Tranh</NavLink>
                            </li>
                            <li className='FooterComponent__middle__right__List__Item'>
                                <NavLink to='/'>Truyện Tranh Online</NavLink>
                            </li>
                            <li className='FooterComponent__middle__right__List__Item'>
                                <NavLink to='/'>Truyện Tranh Mới</NavLink>
                            </li>
                            <li className='FooterComponent__middle__right__List__Item'>
                                <NavLink to='/'>Truyện Tranh Hay</NavLink>
                            </li>
                            <li className='FooterComponent__middle__right__List__Item'>
                                <NavLink to='/'>Manhwa</NavLink>
                            </li>
                            <li className='FooterComponent__middle__right__List__Item'>
                                <NavLink to='/'>Manhua</NavLink>
                            </li>
                            <li className='FooterComponent__middle__right__List__Item'>
                                <NavLink to='/'>Manga</NavLink>
                            </li>
                            <li className='FooterComponent__middle__right__List__Item'>
                                <NavLink to='/'>Truyện Ngôn Tình</NavLink>
                            </li>
                        </ul>

                        <p>
                            Email: thucdn04@gmail.com
                        </p>
                        <p>
                            Liên Hệ Tôi
                        </p>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

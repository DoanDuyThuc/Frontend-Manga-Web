import React, { useEffect } from 'react'
import './FooterComponent.scss'
import Logo from '../../public/images/logo1.png'
import { Col, Container, Row } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { GetAllTheLoaiService } from '../../services/TruyenService'
import { NavLink } from 'react-router-dom'

export const FooterComponent = () => {

    const [dataTheloais, setDataTheloais] = React.useState([]);

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
        if (Theloais?.data) {
            setDataTheloais(Theloais?.data?.data)
        }
    }, [Theloais]);

    return (
        <Container fluid className='FooterComponent'>

            <div className='FooterComponent__middle'>

                <Row >
                    <Col lg={6} className='FooterComponent__middle__left'>
                        <a href='/'>
                            <img loading='lazy' src={Logo} alt='logo' />
                        </a>
                        <p>
                            <iframe
                                loading='lazy'
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
                            {dataTheloais && dataTheloais.map((item, index) => (
                                <li key={item.id} className='FooterComponent__middle__right__List__Item'>
                                    <NavLink to={`/guest/truyen-moi-cap-nhat?searchTheLoai=${item.id}`}>
                                        {item.ten_theloai}
                                    </NavLink>
                                </li>
                            ))}
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

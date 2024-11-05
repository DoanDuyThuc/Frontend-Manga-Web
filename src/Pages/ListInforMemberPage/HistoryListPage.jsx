import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaHistory } from 'react-icons/fa'
import { CartItemComponent } from '../../Components/CartItemComponent/CartItemComponent'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { GetLichSuTruyenService } from '../../services/HomeService'

export const HistoryListPage = () => {

    const user = useSelector(state => state.user);

    const [dataHistory, setDataHistory] = useState([]);

    const { data } = useQuery({
        queryKey: ['Get-history', user.token, user.userId],
        queryFn: async ({ queryKey }) => {
            const [, token, user_id] = queryKey;
            const res = await GetLichSuTruyenService({ token, user_id });
            return res;
        },
        enabled: !!user.userId || !!user.token,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (data) {
            setDataHistory(data?.data);
        }
    }, [data])

    console.log(dataHistory);


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
                    {dataHistory?.map((item, index) => (
                        <Col key={index} lg={2} md={3} sm={4} xs={6}>
                            <CartItemComponent item={item.Truyen} marginZero={true} deleted={true} Ishistory={true} />
                        </Col>

                    ))}
                </Row>
            </div>
        </div>
    )
}

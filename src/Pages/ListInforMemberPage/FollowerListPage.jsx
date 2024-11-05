import React from 'react'
import './ListInforMemberPage.scss'
import { FaHeart } from 'react-icons/fa'
import { CartItemComponent } from '../../Components/CartItemComponent/CartItemComponent'
import { Col, Row } from 'react-bootstrap'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { GetFollowTruyenService } from '../../services/HomeService'
import { useState, useEffect } from 'react'

export const FollowerListPage = () => {

    const user = useSelector(state => state.user);
    const [dataFollow, setDataFollow] = useState([]);

    const { data } = useQuery({
        queryKey: ['Get-Follow', user.token, user.userId],
        queryFn: async ({ queryKey }) => {
            const [, token, user_id] = queryKey;
            const res = await GetFollowTruyenService({ token, user_id });
            return res;
        },
        enabled: !!user.userId || !!user.token,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (data) {
            setDataFollow(data.data);
        }
    }, [data])

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
                    {
                        dataFollow.map((item, index) => {
                            return (
                                <Col lg={2} md={3} sm={4} xs={6} key={index}>
                                    <CartItemComponent item={item.Truyen} marginZero={true} deleted={true} Ishistory={false} />
                                </Col>
                            )
                        })
                    }
                </Row>

            </div>
        </div>
    )
}

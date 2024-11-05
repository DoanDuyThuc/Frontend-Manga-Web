import React, { useEffect, useState } from 'react'
import './HomePage.scss'
import SliderHomeComponent from '../../Components/SliderHomeComponent/SliderHomeComponent'
import { ListHomePageComponent } from '../../Components/ListHomePageComponent/ListHomePageComponent'
import { useQuery } from '@tanstack/react-query'
import { GetTruyenHomeService } from '../../services/HomeService'
import { useDispatch, useSelector } from 'react-redux'
import { setHomeTruyens } from '../../redux/home/homeSlice'

export const HomePage = () => {

    const home = useSelector(state => state.home)
    const dispatch = useDispatch()

    const [searchBtn, setSearchBtn] = useState('')

    const { data } = useQuery({
        queryKey: ['getAllTruyen-Home', {
            page: home?.truyenPanigate.page,
            limit: home?.limit,
            search: searchBtn,
            quoc_gia: '',
            isOver: '',
            typeManga: '',
            soLuongChuong: ''
        }],
        queryFn: async ({ queryKey }) => {
            const [, { page, limit, search, quoc_gia, isOver, typeManga, soLuongChuong }] = queryKey;
            const res = await GetTruyenHomeService({ page, limit, search, quoc_gia, isOver, typeManga, soLuongChuong });
            return res;
        },
        enabled: !!home?.truyenPanigate.page || !!home?.limit || !!searchBtn,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (data) {
            dispatch(setHomeTruyens(data))
        }
    }, [data, dispatch])

    return (
        <div className='HomePage'>
            <SliderHomeComponent dataTruyens={[...home.truyens].sort((a, b) => b.truyen_luotxem - a.truyen_luotxem)} />
            <ListHomePageComponent dataTruyens={home.truyens} />
        </div>
    )
}
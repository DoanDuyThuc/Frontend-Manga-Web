import React from 'react'
import { NavLink } from 'react-router-dom'
import './CartItemComponent.scss'
import { TiDeleteOutline } from "react-icons/ti";
import { formatDistanceStrict } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteFollowTruyenService, DeleteLichSuTruyenService } from '../../services/HomeService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export const CartItemComponent = ({ item, marginZero, deleted, Ishistory }) => {

    const queryClient = useQueryClient();

    const user = useSelector(state => state.user);

    const time = item?.createdAt;
    let timeAgo = "Invalid date";

    if (time) {
        try {
            timeAgo = formatDistanceStrict(new Date(time), new Date(), { addSuffix: true, locale: vi })
        } catch (error) {
            console.error("Error formatting date:", error);
        }
    }

    const mutationDeleteFollow = useMutation({
        mutationFn: DeleteFollowTruyenService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-Follow');
            const previousValue = queryClient.getQueryData('Get-Follow');
            queryClient.setQueryData('Get-Follow', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {
            if (!data.error) {
                toast.success(`🐉 ${data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(`🐉 ${data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries('Get-Follow');
        },
        onError: (error) => {
            toast.error(`🐉 ${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
    });

    const mutationDeleteLichSu = useMutation({
        mutationFn: DeleteLichSuTruyenService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-history');
            const previousValue = queryClient.getQueryData('Get-history');
            queryClient.setQueryData('Get-history', (old) => {
                return old;
            });
            return previousValue;
        },
        onSuccess: (data) => {
            if (!data.error) {
                toast.success(`🐉 ${data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                toast.error(`🐉 ${data?.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries('Get-history');
        },
        onError: (error) => {
            toast.error(`🐉 ${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
    });


    //handle
    const handleDeleteFollow = async () => {
        if (Ishistory) {
            await mutationDeleteLichSu.mutateAsync({ token: user.token, truyen_id: item?.id, user_id: user.userId });
            return;
        }
        await mutationDeleteFollow.mutateAsync({ token: user.token, truyen_id: item?.id, user_id: user.userId });
    }

    return (
        <div className='CartItemComponent'>
            <div style={{ margin: marginZero ? 0 : '0 10px' }} className='CartItemComponent__CartItemAvartar'>
                <NavLink to={`/guest/truyen-tranh/${item?.truyen_ma}`}>
                    <img
                        loading='lazy'
                        crossOrigin='anonymous'
                        src={`${process.env.REACT_APP_DB_HOST}/public${item?.truyen_hinhanhdaidien}`}
                        alt='Win Over The Dragon Emperor This Time Around, Noble Girl!'
                    />
                </NavLink>
                <div className='CartItemComponent__CartItemAvartar__notice'>
                    <span className='CartItemComponent__CartItemAvartar__notice__time'>{timeAgo}</span>
                    {deleted ? (
                        ''
                    ) : (
                        <span className='CartItemComponent__CartItemAvartar__notice__Hot'>Hot</span>
                    )}
                </div>
                {deleted && (
                    <span onClick={() => handleDeleteFollow()} className='CartItemComponent__CartItemAvartar__Delete'>
                        <TiDeleteOutline />
                    </span>
                )}
            </div>

            <div className='CartItemComponent__CartItemInfo'>
                <div className='CartItemComponent__CartItemInfo__name'>
                    <h3>
                        <NavLink to={`/guest/truyen-tranh/${item?.truyen_ma}`}>{item?.truyen_ten}</NavLink>
                    </h3>
                </div>

                <div className='CartItemComponent__CartItemInfo__chapter'>
                    <NavLink to={`/guest/truyen-tranh/${item?.truyen_ma}`}>{item?.Chuongs.length} chương</NavLink>
                </div>
            </div>
        </div>
    )
}

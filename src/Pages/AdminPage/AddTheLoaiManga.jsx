import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { AddTheLoaiForTruyenService, DeleteTheLoaiForTruyenService, GetAllTheLoaiService, GetTruyenService } from '../../services/TruyenService';
import { Badge, Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const AddTheLoaiManga = () => {

    const { truyen_ma, id } = useParams();

    const queryClient = useQueryClient();

    const user = useSelector(state => state?.user);

    const [dataCurrentTheloai, setDataCurrentTheloai] = useState([]);
    const [dataTheloai, setDataTheloai] = useState([]);
    const [dataTruyen, setDataTruyen] = useState([]);

    const Truyens = useQuery({
        queryKey: ['GetTruyen', truyen_ma],
        queryFn: async ({ queryKey }) => {
            const [, truyen_ma] = queryKey;
            const res = await GetTruyenService({ truyen_ma });
            return res;
        },
        enabled: !!truyen_ma,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    const Theloais = useQuery({
        queryKey: ['GetAllTheLoai', { token: user.token, page: '', limit: '', search: '' }],
        queryFn: async ({ queryKey }) => {
            const [, { token, page, limit, search }] = queryKey;
            const response = await GetAllTheLoaiService({ token, page, limit, search });
            return response;
        },
        enabled: !!user.token,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    //mutation

    const mutationAddTheLoaiForTruyen = useMutation({
        mutationFn: AddTheLoaiForTruyenService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetAllTheLoai');
            const previousValue = queryClient.getQueryData('GetAllTheLoai');
            queryClient.setQueryData('GetAllTheLoai', (old) => {
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
            queryClient.invalidateQueries('GetAllTheLoai');
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
    })

    const mutationDeleteTheLoaiForTruyen = useMutation({
        mutationFn: DeleteTheLoaiForTruyenService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetAllTheLoai');
            const previousValue = queryClient.getQueryData('GetAllTheLoai');
            queryClient.setQueryData('GetAllTheLoai', (old) => {
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
            queryClient.invalidateQueries('GetAllTheLoai');
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
    })


    useEffect(() => {
        if (Truyens.data) {
            setDataTruyen(Truyens?.data.data);
            setDataCurrentTheloai(Truyens?.data.data?.TheLoais);
        }
    }, [Truyens.data])

    useEffect(() => {
        if (Theloais.data) {
            setDataTheloai(Theloais.data.data);
        }
    }, [Theloais.data])

    //handle
    const handleAddTheLoai = (theloai) => {
        if (dataCurrentTheloai.map(item => item.id).includes(theloai.id)) {
            const newTheLoai = dataCurrentTheloai.filter(item => item.id !== theloai.id);
            setDataCurrentTheloai(newTheLoai);
        } else {
            setDataCurrentTheloai([...dataCurrentTheloai, theloai]);
        }
    }

    const handleAddTheLoaiForTruyen = async () => {
        const newTheloaiId = dataCurrentTheloai.map(item => item.id).filter(item => !dataTruyen.TheLoais.map(item => item.id).includes(item));


        await mutationAddTheLoaiForTruyen.mutateAsync({
            token: user.token,
            TruyenId: dataTruyen.id,
            TheLoaiIds: newTheloaiId
        })

    }

    const handleRemoveTheloai = async (theloai) => {
        await mutationDeleteTheLoaiForTruyen.mutateAsync({
            token: user.token,
            TruyenId: dataTruyen.id,
            TheLoaiId: theloai.id
        })

    }


    return (
        <div className='DefaultAdmin__right__Content'>
            <h2>Thêm Thể Loại Cho Truyện - {dataTruyen.truyen_ten}</h2>

            <div className="mt-3">
                {dataCurrentTheloai.map((theloai, index) => (
                    <Badge
                        key={index}
                        pill
                        bg="success"
                        className="badge-large me-2 p-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveTheloai(theloai)}
                    >
                        {theloai.ten_theloai} <span aria-hidden="true">&times;</span>
                    </Badge>
                ))}
            </div>

            <Form.Group controlId="genreSelect">
                <Form.Label>Chọn Thể Loại</Form.Label>
                <div className="genre-buttons">
                    {dataTheloai.map((theloai, index) => (
                        <Button
                            key={index}
                            disabled={dataCurrentTheloai.map(item => item.id).includes(theloai.id)}
                            variant={
                                dataCurrentTheloai.map(item => item.id).includes(theloai.id)
                                    ? "primary"
                                    :
                                    "dark"
                            }
                            onClick={() => handleAddTheLoai(theloai)}
                            className="m-1"  // Khoảng cách giữa các nút
                        >
                            {theloai.ten_theloai}
                        </Button>
                    ))}
                </div>
            </Form.Group>

            <Form.Group className='mt-3' style={{ textAlign: 'start' }} as={Col} md="12" controlId="validationSubmit">
                <Button onClick={() => handleAddTheLoaiForTruyen()} variant="outline-danger">
                    Add Thể Loại
                </Button>
            </Form.Group>
        </div>
    )
}

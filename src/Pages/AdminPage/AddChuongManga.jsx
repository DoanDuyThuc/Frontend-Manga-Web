import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom';
import { CreateNewChuongService, DeleteChuongService, GetChuongTruyenService, GetTruyenService } from '../../services/TruyenService';

import * as formik from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { IoAddOutline } from 'react-icons/io5';

export const AddChuongManga = () => {

    const { truyen_ma } = useParams();

    const navigate = useNavigate();

    const user = useSelector(state => state?.user);
    const queryClient = useQueryClient();

    const { Formik } = formik;

    const schemaCreateChuong = yup.object().shape({
        Chuong_so: yup.string().required('Chương số không được để trống'),
        Chuong_ten: yup.string().required('Tên chương không được để trống'),
        Chuong_noidung: yup.string().required('Nội dung chương không được để trống'),
    });


    // modal create Chương
    const [dataChuong, setDataChuong] = useState([]);
    const [showCreateChuong, setShowCreateChuong] = useState(false);

    const handleCloseCreateChuong = () => {
        setShowCreateChuong(false);
    };
    const handleShowCreateChuong = () => setShowCreateChuong(true);

    //mutation
    const mutationCreateChuong = useMutation({
        mutationFn: CreateNewChuongService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetTruyen');
            const previousValue = queryClient.getQueryData('GetTruyen');
            queryClient.setQueryData('GetTruyen', (old) => {
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
            queryClient.invalidateQueries('GetTruyen');
            setShowCreateChuong(false);
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

    const mutationDeleteChuong = useMutation({
        mutationFn: DeleteChuongService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetTruyen');
            const previousValue = queryClient.getQueryData('GetTruyen');
            queryClient.setQueryData('GetTruyen', (old) => {
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
            queryClient.invalidateQueries('GetTruyen');
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

    // query
    const { data } = useQuery({
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

    useEffect(() => {
        if (data) {
            setDataChuong(data?.data);
        }
    }, [data])

    //handle
    const handleDeleteChuong = async (chuong_id) => {
        const isConfirmed = window.confirm("Bạn có chắc muốn Chương này không !");

        if (isConfirmed) {
            await mutationDeleteChuong.mutateAsync({
                token: user.token,
                ChuongId: chuong_id
            })
        }

    }

    return (
        <>
            <div className='DefaultAdmin__right__Content'>
                <h2>Chương Truyện - {dataChuong?.truyen_ten}</h2>

                <Button onClick={() => handleShowCreateChuong()} variant="outline-dark" className='buttonAdd'>
                    <IoMdAdd />
                </Button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <h6 style={{ margin: '0' }}>Thêm thể loại cho truyện : </h6>
                    <Button onClick={() => navigate(`/admin/add-theloai-truyen/${dataChuong.truyen_ma}/${dataChuong?.id}`)} variant="outline-dark">
                        <IoMdAdd />
                    </Button>
                </div>

                <div className='DefaultAdmin__right__Content__listChapter'>
                    {dataChuong?.Chuongs?.length > 0 ? dataChuong?.Chuongs.map((chuong, index) => (

                        <div key={chuong.Chuong_so} className='DefaultAdmin__right__Content__listChapter__item'>
                            <Row>
                                <Col lg={8}>Chương {chuong.Chuong_so} : {chuong.Chuong_ten} - {chuong.Chuong_noidung}</Col>
                                <Col style={{ display: 'flex', gap: '10px' }} lg={4}>
                                    <Button
                                        onClick={() => navigate(`/admin/chapter/${chuong.id}`)}
                                        variant="outline-warning"
                                    >
                                        <IoAddOutline />
                                    </Button>
                                    <Button
                                        onClick={() => navigate(`/admin/update-chuong/${chuong.id}`)}
                                        variant="outline-primary"
                                    >
                                        <CiEdit />
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteChuong(chuong.id)}
                                        variant="outline-danger">
                                        <MdDelete />
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )) : (
                        <h2>Không có chương nào</h2>
                    )}
                </div>
            </div>

            {/* modal create Chuong */}
            <Modal centered show={showCreateChuong} onHide={handleCloseCreateChuong}>
                <div className='Modal_Admin'>
                    <div className='Modal_Admin__header'>
                        <h2>Tạo chương mới cho - {dataChuong?.truyen_ten}</h2>
                    </div>
                    <div className='Modal_Admin__body'>
                        <Formik
                            validationSchema={schemaCreateChuong}
                            onSubmit={
                                async (values) => {

                                    await mutationCreateChuong.mutateAsync({
                                        token: user.token,
                                        Chuong_so: values.Chuong_so,
                                        Chuong_ten: values.Chuong_ten,
                                        Chuong_noidung: values.Chuong_noidung,
                                        TruyenId: dataChuong?.id
                                    })

                                }
                            }
                            initialValues={{
                                Chuong_so: '',
                                Chuong_ten: '',
                                Chuong_noidung: '',
                            }}
                        >
                            {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                                <Form className='LoginFormComponent__Form' noValidate onSubmit={handleSubmit}>
                                    <Form.Group as={Col} md="12" controlId="validationtruyen_So">
                                        <Form.Label>Chương số</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Chuong_so"
                                            placeholder='nhập chương số'
                                            value={values.Chuong_so}
                                            onChange={handleChange}
                                            isValid={touched.Chuong_so && !errors.Chuong_so}
                                        />
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="Chuong_so" component="div" />
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationTen_ten">
                                        <Form.Label>Tên chương này</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Chuong_ten"
                                            placeholder='nhập tên truyện'
                                            value={values.Chuong_ten}
                                            onChange={handleChange}
                                            isValid={touched.Chuong_ten && !errors.Chuong_ten}
                                        />
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="Chuong_ten" component="div" />
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationnoi_dung">
                                        <Form.Label>Nội dung chương</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Chuong_noidung"
                                            placeholder='nhập tên tác giả'
                                            value={values.Chuong_noidung}
                                            onChange={handleChange}
                                            isValid={touched.Chuong_noidung && !errors.Chuong_noidung}
                                        />
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="Chuong_noidung" component="div" />
                                    </Form.Group>

                                    <Form.Group style={{ textAlign: 'end' }} as={Col} md="12" controlId="validationSubmit">
                                        <Button type='submit' variant="outline-dark">
                                            Tạo chương mới
                                        </Button>
                                    </Form.Group>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Modal >
        </>
    )
}

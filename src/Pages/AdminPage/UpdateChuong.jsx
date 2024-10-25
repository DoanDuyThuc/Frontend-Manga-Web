import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';


import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col, Form } from 'react-bootstrap';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { GetChuongTruyenService, UpdateChuongService } from '../../services/TruyenService';
import { toast } from 'react-toastify';

export const UpdateChuong = () => {

    const user = useSelector(state => state.user);

    const navigate = useNavigate();

    const { id } = useParams();

    const { Formik } = formik;

    const schemaUpdateChuong = yup.object().shape({
        Chuong_so: yup.string().required('Chương số không được để trống'),
        Chuong_ten: yup.string().required('Tên chương không được để trống'),
        Chuong_noidung: yup.string().required('Nội dung chương không được để trống'),
    });


    //query
    const { data } = useQuery({
        queryKey: ['GetChuong', { token: user.token, id }],
        queryFn: async ({ queryKey }) => {
            const [, { token, id }] = queryKey;
            const response = await GetChuongTruyenService({ token, id });
            return response;
        },
        enabled: !!user.token && !!id,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    const mutationUpdateChuong = useMutation({
        mutationFn: UpdateChuongService,
        onSuccess: (data) => {
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

            navigate(-1);

        },
        onError: (error) => {
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
    })

    return (
        <div className='DefaultAdmin__right__Content'>
            <h2>Update Chương {data?.data?.Chuong_so} - {data?.data?.Chuong_ten}</h2>

            <Formik
                enableReinitialize={true}
                validationSchema={schemaUpdateChuong}
                onSubmit={
                    async (values) => {

                        await mutationUpdateChuong.mutateAsync({
                            token: user.token,
                            id,
                            Chuong_so: values.Chuong_so,
                            Chuong_ten: values.Chuong_ten,
                            Chuong_noidung: values.Chuong_noidung,
                        })


                    }
                }
                initialValues={{
                    Chuong_so: data?.data?.Chuong_so || '',
                    Chuong_ten: data?.data?.Chuong_ten || '',
                    Chuong_noidung: data?.data?.Chuong_noidung || '',
                }}
            >
                {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                    <Form className='LoginFormComponent__Form' noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="9" controlId="validationtruyen_So">
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

                        <Form.Group as={Col} md="9" controlId="validationTen_ten">
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

                        <Form.Group as={Col} md="9" controlId="validationnoi_dung">
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

                        <Form.Group style={{ textAlign: 'end' }} as={Col} md="9" controlId="validationSubmit">
                            <Button type='submit' variant="outline-dark">
                                Update Chương
                            </Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

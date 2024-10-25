import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { GetInfoUpdateService, UpdateInfoUserService } from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col } from 'react-bootstrap';

import { toast } from 'react-toastify';

export const UpdateUser = () => {

    const user = useSelector(state => state?.user);
    const navigate = useNavigate();

    const { id } = useParams();

    const { Formik } = formik;

    const schema = yup.object().shape({
        username: yup.string(),
        email: yup.string(),
        role: yup.string(),
        point: yup.number(),
    });

    const [dataInfo, setDataInfo] = useState([]);

    // query
    const { data } = useQuery({
        queryKey: ['getInfoUpdate', user.token, id],
        queryFn: async ({ queryKey }) => {
            const [, token, id] = queryKey;
            const res = await GetInfoUpdateService({ token, id });
            return res;
        },
        enabled: !!user.token || !!id,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    // mutation

    const mutationUpdateUser = useMutation({
        mutationFn: UpdateInfoUserService,
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

            navigate('/admin/quan-ly-tai-khoan');

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

    useEffect(() => {
        if (data) {
            setDataInfo(data.data);
        }
    }, [data]);

    return (
        <div className='DefaultAdmin__right__Content'>
            <h2>Cập nhập thông tin user </h2>

            <Formik
                enableReinitialize={true}
                validationSchema={schema}
                onSubmit={
                    async (values) => {
                        await mutationUpdateUser.mutateAsync({ token: user.token, id, ...values });
                    }
                }
                initialValues={{
                    username: dataInfo.username || '',
                    email: dataInfo.email || '',
                    role: dataInfo.role || '',
                    point: Number(dataInfo.point) || 0,
                }}
            >
                {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                    <Form className='LoginFormComponent__Form' noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="9" controlId="userName" >
                            <Form.Label>UserName:</Form.Label>
                            <formik.Field
                                name="username"
                                type='text'
                                className="form-control"
                                // value={values.username}
                                as={Form.Control}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="9" controlId="validationEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder='nhập Email'
                                value={values.email}
                                onChange={handleChange}
                                isValid={touched.email && !errors.email}
                            />
                            <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="email" component="div" />
                        </Form.Group>

                        <Form.Group as={Col} md="9" controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                                isInvalid={touched.role && !!errors.role}
                            >
                                <option value="">Chọn một role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="author">Author</option>
                            </Form.Control>
                            <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="email" component="div" />
                        </Form.Group>

                        <Form.Group as={Col} md="9" controlId="validationEmail">
                            <Form.Label>Point</Form.Label>
                            <Form.Control
                                type="number"
                                name="point"
                                min={0}
                                placeholder='nhập Point'
                                value={values.point}
                                onChange={handleChange}
                                isValid={touched.point && !errors.point}
                            />
                            <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="point" component="div" />
                        </Form.Group>

                        <Form.Group as={Col} md="9" style={{ textAlign: 'end' }}>

                            <Button variant="success" type="submit">
                                Xác nhận thay đổi
                            </Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </div >
    )
}

import React from 'react'
import './ResetPassWordPage.scss'
import { MdLockReset } from 'react-icons/md'
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ResetPasswordService } from '../../services/UserService';
import { toast } from 'react-toastify';

export const ResetPassWordPage = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    const { Formik } = formik;

    const schema = yup.object().shape({
        newPassword: yup.string().min(6, 'mật khẩu ít nhất phải từ 6 ký tự').required('Mật khẩu mới không được để trống'),
        VerifyPassword: yup.string().required('Xác nhận mật khẩu không được để trống').oneOf([yup.ref('newPassword'), null], 'Mật khẩu không khớp'),
    });

    //mutation
    const mutationResetPassword = useMutation({
        mutationFn: ResetPasswordService,
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
            navigate('/')
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

    return (
        <div className='ResetPassWordPage'>
            <h2 className='ResetPassWordPage__Title'>
                <div>
                    <MdLockReset />
                    <p>Nhập Mật Khẩu Mới</p>
                </div>
            </h2>

            <Formik
                validationSchema={schema}
                onSubmit={async (values) => {
                    await mutationResetPassword.mutateAsync({ token, password: values.newPassword })

                }}
                initialValues={{
                    newPassword: '',
                    VerifyPassword: ''
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="ListInforMemberPage__main__content__form__itemPass">
                            <Form.Label>Mật khẩu mới:</Form.Label>
                            <formik.Field
                                type="password"
                                name="newPassword"
                                className="form-control"
                            // isValid={touched.newPassword && !errors.newPassword}

                            />
                            <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="newPassword" component="div" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="ListInforMemberPage__main__content__form__itemPass">
                            <Form.Label>Xác nhận mật khẩu:</Form.Label>
                            <formik.Field
                                type="password"
                                name="VerifyPassword"
                                className="form-control"
                            // isValid={touched.VerifyPassword && !errors.VerifyPassword}

                            />
                            <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="VerifyPassword" component="div" />
                        </Form.Group>

                        <Form.Group className='ListInforMemberPage__main__content__form__btnsubmit'>

                            <Button variant="success" type="submit">
                                Cập Nhập Mật Khẩu
                            </Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

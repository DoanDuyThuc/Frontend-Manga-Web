import React from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { ChangePasswordService } from '../../../services/UserService';
import { toast } from 'react-toastify';

export const SettingChangePassword = () => {

    const user = useSelector(state => state.user);

    const changePassMutation = useMutation({
        mutationFn: ChangePasswordService,
        onSuccess: (data) => {
            if (!data.error) {
                toast.success(`🐉 ${data.message}`, {
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
        onError: (error) => {
            console.log(error);
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

    const { Formik } = formik;

    const validationSchema = yup.object().shape({
        oldPassword: yup.string().required('Mật khẩu không được để trống'),
        newPassword: yup.string().min(6, 'mật khẩu ít nhất phải từ 6 ký tự').required('Mật khẩu mới không được để trống'),
        VerifyPassword: yup.string().required('Xác nhận mật khẩu không được để trống').oneOf([yup.ref('newPassword'), null], 'Mật khẩu không khớp'),
    });

    return (
        <div className='ListInforMemberPage__main__content'>
            <Formik
                initialValues={
                    {
                        oldPassword: '',
                        newPassword: '',
                        VerifyPassword: ''
                    }
                }
                validationSchema={validationSchema}
                onSubmit={async (values) => {

                    await changePassMutation.mutateAsync({
                        token: user.token,
                        oldPassword: values.oldPassword,
                        newPassword: values.newPassword
                    });
                }}
            >
                {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                    <Form className='ListInforMemberPage__main__content__form' onSubmit={handleSubmit}>
                        <p>Đổi Mật Khẩu</p>
                        <Form.Group controlId="formFile" className="ListInforMemberPage__main__content__form__itemPass">
                            <Form.Label>Mật khẩu hiện tại:</Form.Label>
                            <formik.Field
                                type="password"
                                name="oldPassword"
                                className="form-control"
                            // isValid={touched.oldPassword && !errors.oldPassword}
                            />
                        </Form.Group>
                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="password" component="div" />
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
                                Đổi mật khẩu
                            </Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

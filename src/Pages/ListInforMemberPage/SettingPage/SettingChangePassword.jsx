import React from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';

export const SettingChangePassword = () => {
    const { Formik } = formik;

    const validationSchema = yup.object().shape({
        password: yup.string().required('Mật khẩu không được để trống'),
        NewPassword: yup.string().required('Mật khẩu mới không được để trống'),
        VerifyPassword: yup.string().required('Xác nhận mật khẩu không được để trống').oneOf([yup.ref('NewPassword'), null], 'Mật khẩu không khớp'),
    });

    return (
        <div className='ListInforMemberPage__main__content'>
            <Formik
                initialValues={
                    {
                        password: '',
                        NewPassword: '',
                        VerifyPassword: ''
                    }
                }
                validationSchema={validationSchema}
                onSubmit={(values) => {

                    const formData = new FormData();
                    formData.append('password', values.password);
                    formData.append('NewPassword', values.NewPassword);
                    formData.append('VerifyPassword', values.VerifyPassword);


                    console.log(formData.get('password'));
                    console.log(formData.get('NewPassword'));
                    console.log(formData.get('VerifyPassword'));
                }}
            >
                {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                    <Form className='ListInforMemberPage__main__content__form' onSubmit={handleSubmit}>
                        <p>Đổi Mật Khẩu</p>
                        <Form.Group controlId="formFile" className="ListInforMemberPage__main__content__form__itemPass">
                            <Form.Label>Mật khẩu hiện tại:</Form.Label>
                            <formik.Field
                                type="password"
                                name="password"
                                className="form-control"
                                isValid={touched.password && !errors.password}
                            />
                        </Form.Group>
                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="password" component="div" />
                        <Form.Group controlId="formFile" className="ListInforMemberPage__main__content__form__itemPass">
                            <Form.Label>Mật khẩu mới:</Form.Label>
                            <formik.Field
                                type="password"
                                name="NewPassword"
                                className="form-control"
                                isValid={touched.NewPassword && !errors.NewPassword}

                            />
                            <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="NewPassword" component="div" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="ListInforMemberPage__main__content__form__itemPass">
                            <Form.Label>Xác nhận mật khẩu:</Form.Label>
                            <formik.Field
                                type="password"
                                name="VerifyPassword"
                                className="form-control"
                                isValid={touched.VerifyPassword && !errors.VerifyPassword}

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

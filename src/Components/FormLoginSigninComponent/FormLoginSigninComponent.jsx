import React from 'react'
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';

import './FormLoginSigninComponent.scss'
import { Col } from 'react-bootstrap';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

export const FormLoginSigninComponent = ({ setisFormNow, isFormNow }) => {

    const { Formik } = formik;

    const schema = yup.object().shape({
        username: isFormNow === 'dangky' ? yup.string().min(3, "UserName phải có 3 ký tự trở lên").required("Vui lòng nhập tên đăng nhập") : null,
        email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
    });


    return (

        <div className='LoginFormComponent'>
            <h2>{isFormNow === 'dangnhap' ? 'Đăng Nhập' : isFormNow === 'dangky' ? 'Đăng Ký' : 'Quên Mật Khẩu'}</h2>
            <Formik
                validationSchema={schema}
                onSubmit={
                    (values) => {
                        console.log(values)
                    }
                }
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form className='LoginFormComponent__Form' noValidate onSubmit={handleSubmit}>
                        {isFormNow === 'dangky' ? (
                            <Form.Group as={Col} md="12" controlId="validationUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder='nhập Username'
                                    value={values.username}
                                    onChange={handleChange}
                                    isValid={touched.username && !errors.username}

                                />
                                <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="username" component="div" />
                            </Form.Group>

                        ) : ''}
                        <Form.Group as={Col} md="12" controlId="validationEmail">
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
                        <Form.Group as={Col} md="12" controlId="validationPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder='nhập Password'
                                value={values.password}
                                onChange={handleChange}
                                isValid={touched.password && !errors.password}
                            />
                            <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="password" component="div" />
                        </Form.Group>
                        <div className='LoginFormComponent__Form__navigate'>
                            <p>
                                {isFormNow === 'dangky' ? (
                                    <span id='dangnhap' onClick={(e) => setisFormNow(e.target.id)} >Đăng Nhập</span>
                                ) : (
                                    <span id='dangky' onClick={(e) => setisFormNow(e.target.id)} >Đăng Ký</span>
                                )}{isFormNow === 'dangnhap' ? (
                                    <>
                                        &nbsp; | &nbsp;
                                        <span id='quenmatkhau' onClick={(e) => setisFormNow(e.target.id)} >Quên mật khẩu</span>
                                    </>
                                ) : (
                                    ''
                                )}
                            </p>
                        </div>

                        <div className='LoginFormComponent__Form__submit'>
                            <button type="submit">{isFormNow === 'dangnhap' ? (
                                'Đăng Nhập'
                            ) : (
                                'Đăng Ký'
                            )}</button>
                        </div>

                        <div className='LoginFormComponent__Form__social'>
                            <a style={{ backgroundColor: '#2196f3' }} href="/" >
                                <FaFacebookF />
                            </a>
                            <a style={{ backgroundColor: '#e74c3c' }} href="/">
                                <FaGoogle />
                            </a>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

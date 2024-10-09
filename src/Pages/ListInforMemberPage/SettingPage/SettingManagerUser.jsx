import React, { useState } from 'react'
import { Form, Button, Image, ProgressBar } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';

import User from '../../../public/images/user.png'

export const SettingManagerUser = () => {

    const { Formik } = formik;


    const [preview, setPreview] = useState(null);

    const validationSchema = yup.object().shape({
        username: yup.string(),
        avatar: yup.string(),
    });

    const handleFileChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        setFieldValue('avatar', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className='ListInforMemberPage__main__content'>
            <Formik
                initialValues={
                    {
                        avatar: 'anh1',
                        username: 'thucdn04',
                    }
                }
                validationSchema={validationSchema}
                onSubmit={(values) => {

                    const formData = new FormData();
                    formData.append('username', values.username);

                    if (values.avatar) {
                        formData.append('avatar', values.avatar);
                    }

                    console.log(formData.get('avatar'));
                    console.log(formData.get('username'));
                }}
            >
                {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                    <Form className='ListInforMemberPage__main__content__form' onSubmit={handleSubmit}>
                        <Form.Group controlId="formFile" className="ListInforMemberPage__main__content__form__item">
                            <div className="d-flex flex-column align-items-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="file-upload"
                                    onChange={(e) => handleFileChange(e, setFieldValue)}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                    {preview ? (
                                        <Image src={preview} roundedCircle height={80} width={80} alt="avatar preview" />
                                    ) : (
                                        <Image src={User} roundedCircle height={80} width={80} alt="choose avatar" />
                                    )}
                                </label>
                            </div>

                            <div className='ListInforMemberPage__main__content__form__item__note'>
                                <span>dùng hình ảnh 18+ nếu phát hiện sẽ bị khóa tài khoản vĩnh viễn.</span>
                            </div>
                        </Form.Group>

                        <div className='ListInforMemberPage__main__content__form__levelUser'>
                            <div className='ListInforMemberPage__main__content__form__levelUser__skill'>
                                <span className='ListInforMemberPage__main__content__form__levelUser__skill__levelCurrent'>
                                    Tập Sự
                                </span>

                                <span className='ListInforMemberPage__main__content__form__levelUser__skill__levelNext'>
                                    WiBu
                                </span>

                                <ProgressBar className='ListInforMemberPage__main__content__form__levelUser__skill__progress'
                                    now={50}
                                    label={`${50}%`}
                                />
                            </div>
                        </div>

                        <div className='ListInforMemberPage__main__content__form__inforUser'>
                            <p>Thông tin tài khoản</p>
                            <Form.Group controlId="Diem" className="mb-3">
                                <Form.Label>Điểm:</Form.Label>
                                <formik.Field
                                    name="diem"
                                    className="form-control"
                                    value={16}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group controlId="Email" className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <formik.Field
                                    name="email"
                                    className="form-control"
                                    value={'thucdn04@gmail.com'}
                                    disabled
                                />
                            </Form.Group>
                            <p>Thông tin cá nhân</p>
                            <Form.Group controlId="userName" className="mb-3">
                                <Form.Label>UserName:</Form.Label>
                                <formik.Field
                                    name="username"
                                    className="form-control"
                                    value={values.username}
                                />
                            </Form.Group>

                        </div>

                        <Form.Group className='ListInforMemberPage__main__content__form__btnsubmit'>

                            <Button variant="success" type="submit">
                                Lưu
                            </Button>
                        </Form.Group>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

import React, { useState } from 'react'
import { Form, Button, Image, ProgressBar } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';

import User from '../../../public/images/user.png'
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateProfileService } from '../../../services/UserService';
import { toast } from 'react-toastify';
import { setUserId } from '../../../redux/user/userSlice';

export const SettingManagerUser = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state?.user);
    const queryClient = useQueryClient();

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

    // mutations

    const uploadMutaion = useMutation(
        {
            mutationFn: UpdateProfileService,
            onMutate: async (Data) => {
                await queryClient.cancelQueries('getAllUser');
                const previousValue = queryClient.getQueryData('getAllUser');
                queryClient.setQueryData('getAllUser', (old) => {
                    return old;
                });
                return previousValue;
            },
            onSuccess: (data) => {
                queryClient.setQueryData('currentUser', (oldData) => ({
                    ...oldData,
                    ...data,
                }));

                if (!data.error) {
                    dispatch(setUserId(data?.data));
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
                queryClient.invalidateQueries('getAllUser');
            },
            onError: (error) => {
                toast.error(`🐉 ${'đăng nhập thất bại: ' + error}`, {
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
        }
    );

    return (
        <div className='ListInforMemberPage__main__content'>
            <Formik
                initialValues={
                    {
                        avatar: user.avatar !== null ? user.avatar : User,
                        username: user.username,
                    }
                }
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={async (values) => {


                    const formData = new FormData();
                    formData.append('username', values.username);
                    formData.append('type', 'avatar');

                    if (values.avatar) {
                        formData.append('avatar', values.avatar);
                    } else {
                        console.warn('No avatar selected');
                    }

                    await uploadMutaion.mutateAsync({ token: user.token, formData: formData });

                }}
            >
                {({ handleSubmit, handleChange, setFieldValue, values, errors, touched }) => (
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
                                        <Image crossOrigin="anonymous" src={user.avatar !== null ?
                                            `${process.env.REACT_APP_DB_HOST}/public/${user.avatar}` : User}
                                            roundedCircle height={80} width={80} alt="choose avatar" />
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
                                    now={user.point}
                                    label={`${user.point}%`}
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
                                    value={user.point}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group controlId="Email" className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <formik.Field
                                    name="email"
                                    className="form-control"
                                    value={user.email}
                                    disabled
                                />
                            </Form.Group>
                            <p>Thông tin cá nhân</p>
                            <Form.Group controlId="userName" className="mb-3">
                                <Form.Label>UserName:</Form.Label>
                                <formik.Field
                                    name="username"
                                    type='text'
                                    className="form-control"
                                    // value={values.username}
                                    as={Form.Control}
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

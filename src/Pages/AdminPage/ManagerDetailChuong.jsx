import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { IoMdAdd } from 'react-icons/io';
import { motion, Reorder } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateNewImageChuongService, DeleteImagesChuongService, GetChuongTruyenService, UpdateSortImageChuongService } from '../../services/TruyenService';
import { useSelector } from 'react-redux';

import * as formik from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

export const ManagerDetailChuong = () => {

    const user = useSelector(state => state.user);

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { Formik } = formik;

    const { id } = useParams();

    const [images, setImages] = useState([]);

    const schemaCreateImageChuong = yup.object().shape({
        comicImages: yup.array()
            .of(yup.mixed().required('Ảnh là bắt buộc'))
            .required('Cần ít nhất một ảnh')
            .min(1, 'Cần ít nhất một ảnh'),
    });

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

    //mutation
    const mutationCreateImageChuong = useMutation({
        mutationFn: CreateNewImageChuongService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetChuong');
            const previousValue = queryClient.getQueryData('GetChuong');
            queryClient.setQueryData('GetChuong', (old) => old);
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
            queryClient.invalidateQueries('GetChuong');
            setShowCreateAddImageChuong(false);
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
    })

    const mutationDeleteImageChuong = useMutation({
        mutationFn: DeleteImagesChuongService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetChuong');
            const previousValue = queryClient.getQueryData('GetChuong');
            queryClient.setQueryData('GetChuong', (old) => old);
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
            queryClient.invalidateQueries('GetChuong');
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
    })

    const mutationUpdateSortImageChuong = useMutation({
        mutationFn: UpdateSortImageChuongService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetChuong');
            const previousValue = queryClient.getQueryData('GetChuong');
            queryClient.setQueryData('GetChuong', (old) => old);
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
            queryClient.invalidateQueries('GetChuong');
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
    })

    const [showCreateAddImageChuong, setShowCreateAddImageChuong] = useState(false);

    const handleCloseCreateTruyen = () => {
        setShowCreateAddImageChuong(false);
    };
    const handleShowCreateAddImageChuong = () => setShowCreateAddImageChuong(true);

    useEffect(() => {
        if (data) {
            if ((images.length === 0 && data?.data.chuong_hinhanhs.length > 0)) {
                const sortedImages = data.data.chuong_hinhanhs.sort((a, b) => a.sort_order - b.sort_order).map(item => item.chuong_hinhanh_link);
                setImages(sortedImages);
            }
        }
    }, [data, images]);


    useEffect(() => {
        if (mutationCreateImageChuong.isSuccess) {
            const sortedImages = data?.data.chuong_hinhanhs.sort((a, b) => a.sort_order - b.sort_order).map(item => item.chuong_hinhanh_link);
            setImages(sortedImages);
        }
    }, [mutationCreateImageChuong.isSuccess, data]);


    //HANDLE
    const handleSaveOrder = async () => {
        // Gọi API để lưu thứ tự mới

        await mutationUpdateSortImageChuong.mutateAsync({ token: user.token, ChuongId: id, images: images });

    };

    const handleDeleteImage = async (imagepath) => {
        await mutationDeleteImageChuong.mutateAsync({ token: user.token, imagePath: imagepath });
        setImages(images.filter(image => image !== imagepath));
    }

    return (
        <>
            <div className='DefaultAdmin__right__Content'>
                <h2>Quản Lý Nội Dung Chương {data?.data.Chuong_so} - {data?.data.Chuong_ten}</h2>
                <Button onClick={() => handleShowCreateAddImageChuong()} variant="outline-dark" className='buttonAdd'>
                    <IoMdAdd />
                </Button>

                <div className="DefaultAdmin__right__Content__ContainerImageReorder">
                    <h5>kéo để xắp xếp thứ tự ảnh</h5>
                    <Button variant="outline-dark" onClick={handleSaveOrder}>Lưu thứ tự</Button>
                    {/* Nhóm các ảnh với Reorder.Group */}
                    <Reorder.Group
                        axis="y" // Chọn trục sắp xếp là y (dọc)
                        values={images} // Danh sách ảnh
                        onReorder={setImages} // Hàm gọi lại khi sắp xếp lại
                    >
                        {images.map((image, index) => (
                            <Reorder.Item key={image} value={image}>
                                {/* Ảnh hiển thị */}
                                <div className="DefaultAdmin__right__Content__ContainerImageReorder__item">
                                    <img loading='lazy' crossOrigin='anonymous' height={100} width={100}
                                        src={`${process.env.REACT_APP_DB_HOST}/public${image}`}
                                        alt={`${index + 1}`} />
                                    <div className="DefaultAdmin__right__Content__ContainerImageReorder__item__action">
                                        {/* <Button
                                            onClick={() => navigate(`/admin/update-truyen/1`)}
                                            variant="outline-primary"
                                        >
                                            <CiEdit />
                                        </Button> */}
                                        <Button
                                            onClick={() => handleDeleteImage(image)}
                                            variant="outline-danger">
                                            <MdDelete />
                                        </Button>
                                    </div>
                                </div>
                            </Reorder.Item>
                        ))}

                    </Reorder.Group>
                </div>
            </div>
            {/* modal create Image Chuong */}
            <Modal centered show={showCreateAddImageChuong} onHide={handleCloseCreateTruyen}>
                <div className='Modal_Admin'>
                    <div className='Modal_Admin__header'>
                        <h2>Thêm ảnh nội dung chương</h2>
                    </div>
                    <div className='Modal_Admin__body'>
                        <Formik
                            validationSchema={schemaCreateImageChuong}
                            onSubmit={
                                async (values) => {
                                    const formData = new FormData();
                                    formData.append('type', 'chapter');
                                    formData.append('ChuongId', id);
                                    values.comicImages.forEach((image) => {
                                        formData.append('comicImages', image);
                                    });

                                    await mutationCreateImageChuong.mutateAsync({ formData });
                                }
                            }
                            initialValues={{
                                comicImages: [],
                            }}
                        >
                            {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                                <Form className='LoginFormComponent__Form' noValidate onSubmit={handleSubmit}>
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(event) => {
                                                const files = event.target.files;
                                                const fileArray = Array.from(files); // Chuyển FileList thành mảng
                                                setFieldValue('comicImages', fileArray);
                                            }}
                                            className={`form-control ${touched.comicImages && errors.comicImages ? 'is-invalid' : ''}`}
                                        />
                                        {errors.comicImages && (
                                            <div className="invalid-feedback">
                                                {errors.comicImages}
                                            </div>
                                        )}
                                    </div>

                                    <Form.Group style={{ textAlign: 'end' }} as={Col} md="12" controlId="validationSubmit">
                                        <Button type='submit' variant="outline-dark">
                                            Tạo ảnh chương
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

import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetTruyenService, UpdateTruyenService } from '../../services/TruyenService';

import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
import { Button, Col, Image } from 'react-bootstrap';

import thumbnailBase from '../../public/images/anh-thumbnail.jpg'
import { toast } from 'react-toastify';

export const UpdateTruyen = () => {

    const user = useSelector(state => state?.user);
    const navigate = useNavigate();

    const { truyen_ma } = useParams();

    const [dataTruyen, setDataTruyen] = useState([]);
    const [preview, setPreview] = useState(null);

    const { Formik } = formik;

    const schema = yup.object().shape({
        truyen_ten: yup.string(),
        truyen_tacgia: yup.string(),
        truyen_motangan: yup.string(),
        quoc_gia: yup.string(),
        isOver: yup.boolean(),
        truyen_thumbnail: yup.string(),
    });

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

    //mutation
    const mutationUpdateTruyen = useMutation({
        mutationFn: UpdateTruyenService,
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

            navigate('/author/dang-truyen');

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
            setDataTruyen(data.data);
        }
    }, [data]);

    // handle
    const handleFileChange = (e, setFieldValue) => {

        const file = e.target.files[0];

        setFieldValue('truyen_thumbnail', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className='DefaultAuthors__right__Content'>
            <h2>Cập nhập truyện tranh </h2>

            <Formik
                enableReinitialize={true}
                validationSchema={schema}
                onSubmit={
                    async (values) => {
                        const formData = new FormData();
                        formData.append('truyen_ten', values.truyen_ten);
                        formData.append('type', 'comic');

                        if (values.truyen_thumbnail) {
                            formData.append('truyen_thumbnail', values.truyen_thumbnail);
                        } else {
                            console.warn('No thumbnail selected');
                        }
                        formData.append('truyen_tacgia', values.truyen_tacgia);
                        formData.append('truyen_motangan', values.truyen_motangan);
                        formData.append('quoc_gia', values.quoc_gia);
                        formData.append('isOver', values.isOver);


                        await mutationUpdateTruyen.mutateAsync({
                            token: user.token,
                            data: formData,
                            truyen_ma: truyen_ma
                        });

                    }
                }
                initialValues={{
                    truyen_ten: dataTruyen?.truyen_ten || '',
                    truyen_tacgia: dataTruyen?.truyen_tacgia || '',
                    truyen_motangan: dataTruyen?.truyen_motangan || '',
                    truyen_thumbnail: dataTruyen?.truyen_hinhanhdaidien || '',
                    quoc_gia: dataTruyen?.quoc_gia || '',
                    isOver: dataTruyen?.isOver || false,
                    theloaiId: ''
                }}
            >
                {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                    <Form className='LoginFormComponent__Form' noValidate onSubmit={handleSubmit}>
                        <Form.Group as={Col} md="9" controlId="truyen_ten" >
                            <Form.Label>Tên truyện:</Form.Label>
                            <formik.Field
                                name="truyen_ten"
                                type='text'
                                className="form-control"
                                // value={values.username}
                                as={Form.Control}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="9" controlId="formFile" >
                            <Form.Label>Ảnh thumbnail:</Form.Label>
                            <div className="d-flex flex-column align-items-start">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="file-upload"
                                    onChange={(e) => handleFileChange(e, setFieldValue)}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                    {preview ? (
                                        <Image src={preview} height={80} width={80} alt="avatar preview" />
                                    ) : (
                                        <Image crossOrigin="anonymous" src={dataTruyen.truyen_hinhanhdaidien !== null ?
                                            `${process.env.REACT_APP_DB_HOST}/public/${dataTruyen?.truyen_hinhanhdaidien}` : thumbnailBase}
                                            height={80} width={80} alt="choose avatar" />
                                    )}
                                </label>
                            </div>
                        </Form.Group>

                        <Form.Group as={Col} md="9" controlId="truyen_tacgia" >
                            <Form.Label>Tên tác giả:</Form.Label>
                            <formik.Field
                                name="truyen_tacgia"
                                type='text'
                                className="form-control"
                                // value={values.username}
                                as={Form.Control}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="9" controlId="formquoc_gia">
                            <Form.Label>Quốc gia:</Form.Label>
                            <Form.Control
                                as="select"
                                name="quoc_gia"
                                value={values.quoc_gia}
                                onChange={handleChange}
                            >
                                <option value="">Chọn Quốc Gia</option>
                                <option value={'vietnam'}>Việt Nam</option>
                                <option value={'trungquoc'}>Trung Quốc</option>
                                <option value={'hanquoc'}>Hàn Quốc</option>
                                <option value={'nhatban'}>Nhật Bản</option>
                                <option value={'my'}>Mỹ</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} md="9" controlId="formisOver">
                            <Form.Label>Tiến Độ Truyện:</Form.Label>
                            <Form.Control
                                as="select"
                                name="isOver"
                                value={values.isOver}
                                onChange={handleChange}
                            >
                                <option value="">Chọn tiến độ</option>
                                <option value={true}>Đã Hoàn Thành</option>
                                <option value={false}>Chưa Hoàn Thành</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} md="9" controlId="truyen_motangan" >
                            <Form.Label>Mô tả ngắn về truyện:</Form.Label>
                            <formik.Field
                                name="truyen_motangan"
                                type='text'
                                className="form-control"
                                // value={values.username}
                                as={'textarea'}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="9" style={{ textAlign: 'end' }}>

                            <Button variant="success" type="submit">
                                Xác nhận thay đổi
                            </Button>
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

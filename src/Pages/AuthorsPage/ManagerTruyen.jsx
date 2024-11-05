import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, Modal, Table } from 'react-bootstrap'
import { IoIosSearch, IoMdAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import * as formik from 'formik';
import * as yup from 'yup';
import { FaCaretDown, FaFilter } from 'react-icons/fa';
import { IoAddOutline } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { GetTruyenForAuthorService } from '../../services/AuthorService';
import { setAuthorPanigateTruyen, setAuthorTruyens } from '../../redux/author/authorSlice';
import { PaginationComponent } from '../../Components/PanigateComponent/PanigateComponent';
import thumbnailBase from '../../public/images/anh-thumbnail.jpg'
import { CreateTruyenService, DeleteTruyenService } from '../../services/TruyenService';
import { toast } from 'react-toastify';


export const ManagerTruyen = () => {
    const navigate = useNavigate();

    const user = useSelector(state => state.user);
    const author = useSelector(state => state.author);

    const dispatch = useDispatch();

    const queryClient = useQueryClient();

    const { Formik } = formik;

    const schemaCreateTruyen = yup.object().shape({
        truyen_ma: yup.string().required("Vui lòng nhập mã truyện")
            .test('is-uppercase', 'Vui Lòng Viết Hoa Mã Truyện', (value) => {
                return value === value.toUpperCase();
            }),
        truyen_ten: yup.string().required("Vui lòng nhập tên truyện"),
        truyen_tacgia: yup.string().required("Vui lòng nhập tên tác giả"),
        quoc_gia: yup.string().required("Vui lòng nhập quốc gia"),
        truyen_motangan: yup.string().required("Vui lòng viết một mô tả ngắn về truyện"),
        truyen_thumbnail: yup.string().required("Vui lòng thêm ảnh thumbnail cho truyện"),
    });

    const [preview, setPreview] = useState(null);

    const [selectedTruyen, setSelectedTruyen] = useState([]);
    const [showSelectedAction, setshowSelectedAction] = useState(false);

    const [showCreateTruyen, setShowCreateTruyen] = useState(false);

    const [searchInput, setSearchInput] = useState('');

    const [searchBtn, setSearchBtn] = useState('');

    const [searchStatus, setSearchStatus] = useState('');

    const { data } = useQuery({
        queryKey: ['getAllTruyen-Author', { token: user.token, page: author?.truyenPanigate.page, limit: author?.limit, search: searchBtn, searchStatus: searchStatus }],
        queryFn: async ({ queryKey }) => {
            const [, { token, page, limit, search }] = queryKey;
            const res = await GetTruyenForAuthorService({ token, page, limit, search, searchStatus });
            return res;
        },
        enabled: !!user.token,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {
        if (data) {
            dispatch(setAuthorTruyens(data));
        }
    }, [data, dispatch])


    useEffect(() => {
        if (searchInput === '') {
            setSearchBtn('');
            dispatch(setAuthorPanigateTruyen(1));
        }
    }, [searchInput, dispatch])

    //mutation
    const mutationCreateTruyen = useMutation({
        mutationFn: CreateTruyenService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('getAllTruyen');
            const previousValue = queryClient.getQueryData('getAllTruyen');
            queryClient.setQueryData('getAllTruyen', (old) => {
                return old;
            });
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
            queryClient.invalidateQueries('getAllUser');
            setShowCreateTruyen(false);
            setPreview(null);
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

    const mutationDeleteTruyen = useMutation({
        mutationFn: DeleteTruyenService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('getAllTruyen');
            const previousValue = queryClient.getQueryData('getAllTruyen');
            queryClient.setQueryData('getAllTruyen', (old) => {
                return old;
            });
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
    })


    const handleCloseCreateTruyen = () => {
        setShowCreateTruyen(false);
        setPreview(null);
    };
    const handleShowCreateTruyen = () => setShowCreateTruyen(true);

    // logic handle file
    const handleFileChange = (e, setFieldValue) => {

        const file = e.target.files[0];

        setFieldValue('truyen_thumbnail', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    //handle
    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    const handleKeyDownEnter = (e) => {
        if (e.key === 'Enter') {
            setSearchBtn(searchInput);
            dispatch(setAuthorPanigateTruyen(1));
        }
    }

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedTruyen(author?.truyens.Truyens.map(truyen => truyen.id))
        } else {
            setSelectedTruyen([]);
        }
    };

    const handleSelectTruyen = (e, truyenId) => {
        if (e.target.checked) {
            setSelectedTruyen([...selectedTruyen, truyenId]);
        } else {
            setSelectedTruyen(selectedTruyen.filter(id => id !== truyenId));
        }
    };

    const handleDeleteTruyenAll = async () => {
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa tất cả user đã chọn không?");
        if (isConfirmed) {
            await mutationDeleteTruyen.mutateAsync({ token: user.token, ids: selectedTruyen });
            setshowSelectedAction(false);
            dispatch(setAuthorPanigateTruyen(1));
        }

    }

    const handleDeleteTruyen = async (truyenId) => {
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa tất cả user đã chọn không?");
        if (isConfirmed) {
            await mutationDeleteTruyen.mutateAsync({ token: user.token, ids: [truyenId] });
            dispatch(setAuthorPanigateTruyen(1));
        }
    }

    //panigate

    const handlePaginate = (pageNumber) => {
        dispatch(setAuthorPanigateTruyen(pageNumber));
    };

    return (
        <>
            <div className='DefaultAuthors__right__Content'>
                <h2>Đăng tác phẩm của bạn</h2>

                <Button onClick={() => handleShowCreateTruyen()} variant="outline-dark" className='buttonAdd'>
                    <IoMdAdd />
                </Button>
                <div className='DefaultAuthors__right__Content__Search'>
                    <input
                        onChange={(e) => handleSearchInput(e)}
                        onKeyDown={(e) => handleKeyDownEnter(e)}
                        type='text' placeholder='Tìm kiếm truyện tranh' />
                    <button onClick={() => {
                        setSearchBtn(searchInput);
                        dispatch(setAuthorPanigateTruyen(1));

                    }}>
                        <IoIosSearch />
                    </button>

                    <div className='DefaultAuthors__right__Content__Search__status'>
                        <FaFilter />
                        <span>Lọc theo trạng thái</span>

                        <select
                            onChange={(e) => {
                                setSearchStatus(e.target.value);
                                dispatch(setAuthorPanigateTruyen(1));
                            }}
                            defaultValue={''}
                        >
                            <option value={''}>Tất cả</option>
                            <option value={1}>Active</option>
                            <option value={0}>Pending</option>
                        </select>
                    </div>
                </div>

                <div className='DefaultAuthors__right__Content__Table'>
                    <Table bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th className='DefaultAuthors__right__Content__Table__selected'>
                                    <Form.Check
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedTruyen.length === author?.truyens?.Truyens?.length}
                                    />
                                    <button
                                        onClick={() => setshowSelectedAction(!showSelectedAction)}
                                        variant="secondary">
                                        <FaCaretDown />
                                    </button>

                                    {showSelectedAction && (
                                        <div className='DefaultAuthors__right__Content__Table__selected__action'>
                                            <Button onClick={() => handleDeleteTruyenAll()} size='1rem' variant="danger">xóa</Button>
                                        </div>
                                    )}
                                </th>
                                <th className="text-center">mã</th>
                                <th className="text-center">Tên Truyện</th>
                                <th className="text-center">Tác Giả</th>
                                <th className="text-center">Thumbnail</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {author?.truyens?.Truyens && author?.truyens.Truyens.map((Truyen, index) => (
                                <tr key={Truyen.id} >
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={(e) => handleSelectTruyen(e, Truyen.id)}
                                            checked={selectedTruyen.includes(Truyen.id)}
                                        />
                                    </td>
                                    <td className="text-center">{Truyen.truyen_ma}</td>
                                    <td className="text-center">{Truyen.truyen_ten}</td>
                                    <td className="text-center">{Truyen.truyen_tacgia}</td>
                                    <td className="text-center">
                                        <img loading='lazy' height={50} width={50} crossOrigin='anonymous'
                                            src={Truyen.truyen_hinhanhdaidien !== null ?
                                                `${process.env.REACT_APP_DB_HOST}/public${Truyen.truyen_hinhanhdaidien}`
                                                : ''
                                            }
                                            alt='author' />
                                    </td>
                                    <td className="text-center Manager_status">
                                        {Truyen.truyen_duyet ? (
                                            <span style={{ backgroundColor: '#42883f' }} >Active</span>

                                        ) : (
                                            <span style={{ backgroundColor: '#eeae4b' }} >Pending</span>

                                        )}
                                    </td>
                                    <td className='DefaultAuthors__right__Content__Table__action text-center'>
                                        <Button
                                            onClick={() => navigate(`/author/add-chuong-truyen/${Truyen.truyen_ma}`)}
                                            variant="outline-warning"
                                        >
                                            <IoAddOutline />
                                        </Button>
                                        <Button
                                            onClick={() => navigate(`/author/update-truyen/${Truyen.truyen_ma}`)}
                                            variant="outline-primary"
                                        >
                                            <CiEdit />
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteTruyen(Truyen.id)}

                                            variant="outline-danger">
                                            <MdDelete />
                                        </Button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
                    <PaginationComponent
                        itemsPerPage={author?.limit}
                        totalItems={author?.truyenPanigate.totalItems}
                        totalPages={author.truyenPanigate.totalPages}
                        paginate={handlePaginate}
                        currentPage={author.truyenPanigate.page}
                    />
                </div>
            </div>

            {/* modal create Truyen */}
            <Modal centered show={showCreateTruyen} onHide={handleCloseCreateTruyen}>
                <div className='Modal_Admin'>
                    <div className='Modal_Admin__header'>
                        <h2>Tạo truyện mới</h2>
                    </div>
                    <div className='Modal_Admin__body'>
                        <Formik
                            validationSchema={schemaCreateTruyen}
                            onSubmit={
                                async (values) => {

                                    const formData = new FormData();
                                    formData.append('type', 'comic');
                                    formData.append('truyen_thumbnail', values.truyen_thumbnail);
                                    formData.append('truyen_ma', values.truyen_ma);
                                    formData.append('truyen_ten', values.truyen_ten);
                                    formData.append('truyen_tacgia', values.truyen_tacgia);
                                    formData.append('truyen_motangan', values.truyen_motangan);
                                    formData.append('quoc_gia', values.quoc_gia);
                                    formData.append('UserId', user.userId);

                                    await mutationCreateTruyen.mutateAsync({ token: user.token, data: formData });

                                }
                            }
                            initialValues={{
                                truyen_ma: '',
                                truyen_ten: '',
                                truyen_tacgia: '',
                                truyen_motangan: '',
                                quoc_gia: '',
                                truyen_thumbnail: '',
                            }}
                        >
                            {({ handleSubmit, handleChange, setFieldValue, values, touched, errors }) => (
                                <Form className='LoginFormComponent__Form' noValidate onSubmit={handleSubmit}>
                                    <Form.Group as={Col} md="12" controlId="validationtruyen_ma">
                                        <Form.Label>Mã Truyện</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="truyen_ma"
                                            placeholder='nhập mã truyện'
                                            value={values.truyen_ma}
                                            onChange={handleChange}
                                            isValid={touched.truyen_ma && !errors.truyen_ma}
                                        />
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="truyen_ma" component="div" />
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationTen_truyen">
                                        <Form.Label>Tên Truyện</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="truyen_ten"
                                            placeholder='nhập tên truyện'
                                            value={values.truyen_ten}
                                            onChange={handleChange}
                                            isValid={touched.truyen_ten && !errors.truyen_ten}
                                        />
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="truyen_ten" component="div" />
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="formquoc_gia">
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

                                    <Form.Group as={Col} md="12" controlId="validationTac_gia">
                                        <Form.Label>Tác Giả</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="truyen_tacgia"
                                            placeholder='nhập tên tác giả'
                                            value={values.truyen_tacgia}
                                            onChange={handleChange}
                                            isValid={touched.truyen_tacgia && !errors.truyen_tacgia}
                                        />
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="truyen_tacgia" component="div" />
                                    </Form.Group>

                                    <Form.Group as={Col} md="12" controlId="validationMo_ta">
                                        <Form.Label>Viết Mô Tả Truyện</Form.Label>
                                        <Form.Control
                                            type="textArea"
                                            as="textarea"
                                            name="truyen_motangan"
                                            placeholder='viết một mô tả ngắn cho truyện'
                                            value={values.truyen_motangan}
                                            onChange={handleChange}
                                            isValid={touched.truyen_motangan && !errors.truyen_motangan}
                                        />
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="truyen_motangan" component="div" />
                                    </Form.Group>

                                    <Form.Group as={Col} md="4" controlId="formFile" >
                                        <Form.Label>Ảnh thumbnail</Form.Label>
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
                                                    <Image src={preview} roundedCircle height={80} width={80} alt="thumbnail preview" />
                                                ) : (
                                                    <Image crossOrigin="anonymous" src={thumbnailBase}
                                                        roundedCircle height={80} width={80} alt="choose avatar" />
                                                )}
                                            </label>
                                        </div>
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="truyen_thumbnail" component="div" />
                                    </Form.Group>

                                    <Form.Group style={{ textAlign: 'end' }} as={Col} md="12" controlId="validationSubmit">
                                        <Button type='submit' variant="outline-dark">
                                            Tạo truyện tranh
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

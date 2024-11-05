import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CreateTheLoaiService, DeleteTheLoaiService, GetAllTheLoaiService, UpdateTheLoaiService } from '../../services/TruyenService';
import { Button, Col, Form, Modal, Table } from 'react-bootstrap';
import { IoIosSearch, IoMdAdd } from 'react-icons/io';
import { setPanigateTheLoai, setTheloais } from '../../redux/admin/adminSlice';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FaCaretDown } from 'react-icons/fa';

import * as formik from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { PaginationComponent } from '../../Components/PanigateComponent/PanigateComponent';

export const ManagerTheLoai = () => {

    const queryClient = useQueryClient();

    const user = useSelector(state => state.user);

    const admin = useSelector(state => state.admin);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { Formik } = formik;


    const schemaCreateTheloai = yup.object().shape({
        ten_theloai: yup.string().required('Tên thể loại không được để trống'),

    });

    const schemaUpdateTheloai = yup.object().shape({
        ten_theloai: yup.string(),

    });

    const [selectedTheloais, setSelectedTheloais] = useState([]);
    const [showSelectedAction, setshowSelectedAction] = useState(false);


    const [showCreateTheloai, setShowCreateTheloai] = useState(false);

    const handleCloseCreateTheloais = () => setShowCreateTheloai(false);
    const handleShowCreateTheloais = () => setShowCreateTheloai(true);


    const [initialUpdateTheloai, setInitialUpdateTheloai] = useState({
        id: '',
        ten_theloai: '',
    });
    const [showUpdateTheloai, setShowUpdateTheloai] = useState(false);

    const handleCloseUpdateTheloais = () => setShowUpdateTheloai(false);
    const handleShowUpdateTheloais = (theloai, id) => {
        setShowUpdateTheloai(true)
        setInitialUpdateTheloai({
            id: id,
            ten_theloai: theloai,
        });
    };

    const [searchInput, setSearchInput] = useState('');
    const [searchBtn, setSearchBtn] = useState('');

    const { data } = useQuery({
        queryKey: ['GetAllTheLoai', { page: admin.theloaiPanigate.page, limit: admin.limit, search: searchBtn }],
        queryFn: async ({ queryKey }) => {
            const [, { page, limit, search }] = queryKey;
            const response = await GetAllTheLoaiService({ page, limit, search });
            return response;
        },
        enabled: !!admin.theloaiPanigate.page && !!admin.limit,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    // mutation

    const mutationCreateTheloai = useMutation({
        mutationFn: CreateTheLoaiService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetAllTheLoai');
            const previousValue = queryClient.getQueryData('GetAllTheLoai');
            queryClient.setQueryData('GetAllTheLoai', (old) => {
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
            queryClient.invalidateQueries('GetAllTheLoai');
            setShowCreateTheloai(false);
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
    });

    const mutationDeleteTheloai = useMutation({
        mutationFn: DeleteTheLoaiService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetAllTheLoai');
            const previousValue = queryClient.getQueryData('GetAllTheLoai');
            queryClient.setQueryData('GetAllTheLoai', (old) => {
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
            queryClient.invalidateQueries('GetAllTheLoai');
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

    const mutationUpdateTheloai = useMutation({
        mutationFn: UpdateTheLoaiService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('GetAllTheLoai');
            const previousValue = queryClient.getQueryData('GetAllTheLoai');
            queryClient.setQueryData('GetAllTheLoai', (old) => {
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
            queryClient.invalidateQueries('GetAllTheLoai');
            setShowUpdateTheloai(false);
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

    useEffect(() => {
        if (data) {
            dispatch(setTheloais(data));
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (searchInput === '') {
            setSearchBtn('');
            dispatch(setPanigateTheLoai(1));
        }
    }, [searchInput, dispatch])

    //handle 
    // Checkbox logic
    const handleSelectAll = (e) => {
        if (e.target.checked) {

            setSelectedTheloais(admin?.theloais.map(theloai => theloai.id))
        } else {
            setSelectedTheloais([]);
        }
    };

    const handleSelectTheloai = (e, TheloaiId) => {
        if (e.target.checked) {
            setSelectedTheloais([...selectedTheloais, TheloaiId]);
        } else {
            setSelectedTheloais(selectedTheloais.filter(id => id !== TheloaiId));
        }
    };

    const handlePaginate = (pageNumber) => {
        dispatch(setPanigateTheLoai(pageNumber));
    };

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    const handleKeyDownEnter = (e) => {
        if (e.key === 'Enter') {
            setSearchBtn(searchInput);
            dispatch(setPanigateTheLoai(1));
        }
    }

    const handleDeleteAllTheloai = async () => {
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa tất cả user đã chọn không?");
        if (isConfirmed) {
            await mutationDeleteTheloai.mutateAsync({ token: user.token, ids: selectedTheloais });
            setshowSelectedAction(false);
        }
    }

    const handleDeleteTheloai = async (userId) => {
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa user này không?");
        if (isConfirmed) {
            await mutationDeleteTheloai.mutateAsync({ token: user.token, ids: [userId] });
        }
    }

    return (
        <>
            <div className='DefaultAdmin__right__Content'>
                <h2>Quản Lý Thể Loại</h2>

                <Button onClick={() => handleShowCreateTheloais()} variant="outline-dark" className='buttonAdd'>
                    <IoMdAdd />
                </Button>

                <div className='DefaultAdmin__right__Content__Search'>
                    <input
                        onChange={(e) => handleSearchInput(e)}
                        onKeyDown={(e) => handleKeyDownEnter(e)}
                        type='text' placeholder='Tìm kiếm người dùng' />
                    <button
                        onClick={() => {
                            setSearchBtn(searchInput);
                            dispatch(setPanigateTheLoai(1));
                        }}
                    >
                        <IoIosSearch />
                    </button>
                </div>

                <div className='DefaultAdmin__right__Content__Table'>
                    <Table bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th className='DefaultAdmin__right__Content__Table__selected'>
                                    <Form.Check
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selectedTheloais.length === admin?.theloais.length}
                                    />
                                    <button onClick={() => setshowSelectedAction(!showSelectedAction)} variant="secondary">
                                        <FaCaretDown />
                                    </button>

                                    {showSelectedAction && (
                                        <div className='DefaultAdmin__right__Content__Table__selected__action'>
                                            <Button
                                                onClick={() => handleDeleteAllTheloai()}
                                                size='1rem' variant="danger">xóa</Button>
                                        </div>
                                    )}
                                </th>
                                <th className="text-center">#</th>
                                <th className="text-center">Tên Thể Loại</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {admin?.theloais && admin?.theloais.map((Theloai, index) => (
                                <tr key={Theloai.id} >
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={(e) => handleSelectTheloai(e, Theloai.id)}
                                            checked={selectedTheloais.includes(Theloai.id)}
                                        // disabled={user.username === User.username ? true : false}
                                        />
                                    </td>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{Theloai.ten_theloai}</td>

                                    <td className='DefaultAdmin__right__Content__Table__action text-center'>
                                        <Button
                                            onClick={() => handleShowUpdateTheloais(Theloai.ten_theloai, Theloai.id)}
                                            variant="outline-primary"
                                        >
                                            <CiEdit />
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteTheloai(Theloai.id)}
                                            variant="outline-danger">
                                            <MdDelete />
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                    <PaginationComponent
                        itemsPerPage={admin?.limit}
                        totalItems={admin?.theloaiPanigate.totalItems}
                        totalPages={admin?.theloaiPanigate.totalPages}
                        paginate={handlePaginate}
                        currentPage={admin?.theloaiPanigate.page}
                    />
                </div>

            </div>


            {/* Modal Create Theloai */}
            <Modal centered show={showCreateTheloai} onHide={handleCloseCreateTheloais}>
                <div className='Modal_Admin'>
                    <div className='Modal_Admin__header'>
                        <h2>Tạo các thể loại</h2>
                    </div>
                    <div className='Modal_Admin__body'>
                        <Formik
                            validationSchema={schemaCreateTheloai}
                            onSubmit={
                                async (values) => {

                                    await mutationCreateTheloai.mutateAsync({
                                        token: user.token,
                                        ten_theloai: values.ten_theloai,
                                    });


                                }
                            }
                            initialValues={{
                                ten_theloai: '',
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form className='LoginFormComponent__Form' noValidate onSubmit={handleSubmit}>
                                    <Form.Group as={Col} md="12" controlId="validationten_theloai">
                                        <Form.Label>Tên thể loại</Form.Label>
                                        <Form.Control
                                            type="ten_theloai"
                                            name="ten_theloai"
                                            placeholder='nhập tên thể loại'
                                            value={values.ten_theloai}
                                            onChange={handleChange}
                                            isValid={touched.ten_theloai && !errors.ten_theloai}
                                        />
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="ten_theloai" component="div" />
                                    </Form.Group>

                                    <Form.Group style={{ textAlign: 'end' }} as={Col} md="12" controlId="validationSubmit">
                                        <Button type='submit' variant="outline-dark">
                                            Tạo Thể Loại
                                        </Button>
                                    </Form.Group>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Modal>

            {/* Modal update thể loại */}
            <Modal centered show={showUpdateTheloai} onHide={handleCloseUpdateTheloais}>
                <div className='Modal_Admin'>
                    <div className='Modal_Admin__header'>
                        <h2>Tạo các thể loại</h2>
                    </div>
                    <div className='Modal_Admin__body'>
                        <Formik
                            enableReinitialize={true}
                            validationSchema={schemaUpdateTheloai}
                            onSubmit={
                                async (values) => {
                                    await mutationUpdateTheloai.mutateAsync({
                                        token: user.token,
                                        id: values.id,
                                        ten_theloai: values.ten_theloai,
                                    })
                                }
                            }
                            initialValues={initialUpdateTheloai}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form className='LoginFormComponent__Form' noValidate onSubmit={handleSubmit}>
                                    <Form.Group as={Col} md="12" controlId="validationten_theloai">
                                        <Form.Label>Tên thể loại</Form.Label>
                                        <Form.Control
                                            type="ten_theloai"
                                            name="ten_theloai"
                                            placeholder='nhập tên thể loại'
                                            value={values.ten_theloai}
                                            onChange={handleChange}
                                            isValid={touched.ten_theloai && !errors.ten_theloai}
                                        />
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="ten_theloai" component="div" />
                                    </Form.Group>

                                    <Form.Group style={{ textAlign: 'end' }} as={Col} md="12" controlId="validationSubmit">
                                        <Button type='submit' variant="outline-dark">
                                            Update
                                        </Button>
                                    </Form.Group>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Modal>
        </>
    )
}

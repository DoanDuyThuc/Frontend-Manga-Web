import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Table } from 'react-bootstrap';
import { IoIosSearch, IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DeleteUserService, GetAllUserService, SignInService } from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { setPanigateUser, setUsers } from '../../redux/admin/adminSlice';
import UserImage from '../../public/images/user.png';
import { PaginationComponent } from '../../Components/PanigateComponent/PanigateComponent';
import Form from 'react-bootstrap/Form';
import * as formik from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ManagerAccount = () => {

    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const admin = useSelector(state => state.admin);

    const queryClient = useQueryClient();


    const { Formik } = formik;

    const schemaCreateUser = yup.object().shape({
        username: yup.string().min(3, "UserName phải có 3 ký tự trở lên").required("Vui lòng nhập tên đăng nhập"),
        email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
        password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
    });

    const [showCreateUser, setShowCreateUser] = useState(false);

    const handleCloseCreateUser = () => setShowCreateUser(false);
    const handleShowCreateUser = () => setShowCreateUser(true);

    const dispatch = useDispatch();

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showSelectedAction, setshowSelectedAction] = useState(false);
    // search user
    const [searchInput, setSearchInput] = useState('');

    const [searchBtn, setSearchBtn] = useState('');


    const { data } = useQuery({
        queryKey: ['getAllUser', user?.token, { page: admin?.userPanigate.page, limit: admin?.limit, search: searchBtn }],
        queryFn: async ({ queryKey }) => {
            const [, token, { page, limit, search }] = queryKey;
            const response = await GetAllUserService(token, page, limit, search);
            return response;
        },
        enabled: !!user?.token && !!admin.userPanigate.page && !!admin.limit,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    useEffect(() => {

        if (data) {
            dispatch(setUsers(data));
        }

    }, [data, dispatch])

    useEffect(() => {
        if (searchInput === '') {
            setSearchBtn('');
            dispatch(setPanigateUser(1));
        }
    }, [searchInput, dispatch])

    // mutation
    const mutationCreateUser = useMutation({
        mutationFn: SignInService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('getAllUser');
            const previousValue = queryClient.getQueryData('getAllUser');
            queryClient.setQueryData('getAllUser', (old) => {
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
            setShowCreateUser(false);
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
    });

    const mutationDeleteUser = useMutation({
        mutationFn: DeleteUserService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('getAllUser');
            const previousValue = queryClient.getQueryData('getAllUser');
            queryClient.setQueryData('getAllUser', (old) => {
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

    const handlePaginate = (pageNumber) => {
        dispatch(setPanigateUser(pageNumber));
    };

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    const handleKeyDownEnter = (e) => {
        if (e.key === 'Enter') {
            setSearchBtn(searchInput);
            dispatch(setPanigateUser(1));
        }
    }

    // Checkbox logic
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const currentUserId = user?.userId;
            const filteredUsers = admin.users.filter(user => user.id !== currentUserId);
            setSelectedUsers(filteredUsers.map(user => user.id))
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (e, userId) => {
        if (e.target.checked) {
            setSelectedUsers([...selectedUsers, userId]);
        } else {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        }
    };

    const handleDeleteAllUser = async () => {
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa tất cả user đã chọn không?");
        if (isConfirmed) {
            await mutationDeleteUser.mutateAsync({ token: user.token, ids: selectedUsers });
            setshowSelectedAction(false);
        }
    }

    const handleDeleteUser = async (userId) => {
        const isConfirmed = window.confirm("Bạn có chắc muốn xóa user này không?");
        if (isConfirmed) {
            await mutationDeleteUser.mutateAsync({ token: user.token, ids: [userId] });
        }
    }

    return (
        <>
            <div className='DefaultAdmin__right__Content'>
                <h2>Quản Lý Người Dùng</h2>
                <Button onClick={handleShowCreateUser} variant="outline-dark" className='buttonAdd'>
                    <IoMdAdd />
                </Button>
                <div className='DefaultAdmin__right__Content__Search'>
                    <input
                        onChange={(e) => handleSearchInput(e)}
                        onKeyDown={(e) => handleKeyDownEnter(e)}
                        type='text' placeholder='Tìm kiếm người dùng' />
                    <button onClick={() => {
                        setSearchBtn(searchInput);
                        dispatch(setPanigateUser(1));
                    }}>
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
                                        checked={selectedUsers.length === admin?.users.length - 1}
                                    />
                                    <button onClick={() => setshowSelectedAction(!showSelectedAction)} variant="secondary">
                                        <FaCaretDown />
                                    </button>

                                    {showSelectedAction && (
                                        <div className='DefaultAdmin__right__Content__Table__selected__action'>
                                            <Button onClick={() => handleDeleteAllUser()} size='1rem' variant="danger">xóa</Button>
                                        </div>
                                    )}
                                </th>
                                <th className="text-center">#</th>
                                <th className="text-center">Username</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Avatar</th>
                                <th className="text-center">Role</th>
                                <th className="text-center">Point</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {admin?.users && admin?.users.map((User, index) => (
                                <tr key={User.id} >
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            onChange={(e) => handleSelectUser(e, User.id)}
                                            checked={selectedUsers.includes(User.id)}
                                            disabled={user.username === User.username ? true : false}
                                        />
                                    </td>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{User.username}</td>
                                    <td className="text-center">{User.email}</td>
                                    <td className="text-center">
                                        <img loading='lazy' height={50} width={50} crossOrigin='anonymous'
                                            src={User.avatar !== null ?
                                                `${process.env.REACT_APP_DB_HOST}/public${User.avatar}`
                                                : UserImage
                                            }
                                            alt='author' />
                                    </td>
                                    <td className="text-center">{User.role}</td>
                                    <td className="text-center">{User.point}</td>
                                    <td className='DefaultAdmin__right__Content__Table__action text-center'>
                                        <Button
                                            onClick={() => navigate(`/admin/update-user/${User.id}`)}
                                            variant="outline-primary"
                                        >
                                            <CiEdit />
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteUser(User.id)}
                                            disabled={
                                                User.username === user.username && true}
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
                        totalItems={admin?.userPanigate.totalItems}
                        totalPages={admin?.userPanigate.totalPages}
                        paginate={handlePaginate}
                        currentPage={admin.userPanigate.page}
                    />
                </div>
            </div>

            {/* modal create user */}
            <Modal centered show={showCreateUser} onHide={handleCloseCreateUser}>
                <div className='Modal_Admin'>
                    <div className='Modal_Admin__header'>
                        <h2>Tạo người dùng mới</h2>
                    </div>
                    <div className='Modal_Admin__body'>
                        <Formik
                            validationSchema={schemaCreateUser}
                            onSubmit={
                                async (values) => {


                                    await mutationCreateUser.mutateAsync({
                                        username: values.username,
                                        email: values.email,
                                        password: values.password
                                    });

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
                                    <Form.Group as={Col} md="12" controlId="validationusername">
                                        <Form.Label>username</Form.Label>
                                        <Form.Control
                                            type="username"
                                            name="username"
                                            placeholder='nhập username'
                                            value={values.username}
                                            onChange={handleChange}
                                            isValid={touched.username && !errors.username}
                                        />
                                        <formik.ErrorMessage style={{ marginTop: '10px', color: 'red' }} name="username" component="div" />
                                    </Form.Group>

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

                                    <Form.Group style={{ textAlign: 'end' }} as={Col} md="12" controlId="validationSubmit">
                                        <Button type='submit' variant="outline-dark">
                                            Tạo user
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

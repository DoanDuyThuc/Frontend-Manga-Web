import React, { useEffect, useRef, useState } from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Form, Pagination } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FaComment } from 'react-icons/fa';
import avartarNotUser from '../../public/images/avartarNotUser.jpg'

import './CommentComponent.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CreateCommentService, CreateRepCommentService, DeleteCommentService, DeleteRepCommentOfUserService, GetAllCommentService, UpdateCommentOfUserService, UpdateRepCommentService } from '../../services/HomeService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { set } from 'date-fns';


export const CommentComponent = ({ truyenId }) => {

    const user = useSelector(state => state.user);
    const location = useLocation();

    const queryClient = useQueryClient();

    const commentRef = useRef(null);
    const [dataComments, setDataComments] = useState([]);
    const [isRepcomment, setIsRepcomment] = useState('');
    const [IsUpdateComment, setIsUpdateComment] = useState('');
    const [IsUpdateRepComment, setIsUpdateRepComment] = useState('');

    const isRead = new URLSearchParams(location.search).get('read');

    //query
    const { data } = useQuery({
        queryKey: ['Get-Comments', truyenId],
        queryFn: async ({ queryKey }) => {
            const [, truyenId] = queryKey;
            const res = await GetAllCommentService({ truyenId });
            return res;
        },
        enabled: !!truyenId,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    })

    //mutation
    const mutationCreateComment = useMutation({
        mutationFn: CreateCommentService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-Comments');
            const previousValue = queryClient.getQueryData('Get-Comments');
            queryClient.setQueryData('Get-Comments', (old) => {
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
            queryClient.invalidateQueries('Get-Comments');
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

    const mutationCreateRepComment = useMutation({
        mutationFn: CreateRepCommentService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-Comments');
            const previousValue = queryClient.getQueryData('Get-Comments');
            queryClient.setQueryData('Get-Comments', (old) => {
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
            queryClient.invalidateQueries('Get-Comments');
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

    const mutationDeleteComment = useMutation({
        mutationFn: DeleteCommentService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-Comments');
            const previousValue = queryClient.getQueryData('Get-Comments');
            queryClient.setQueryData('Get-Comments', (old) => {
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
            queryClient.invalidateQueries('Get-Comments');
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

    const mutationUpdateComment = useMutation({
        mutationFn: UpdateCommentOfUserService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-Comments');
            const previousValue = queryClient.getQueryData('Get-Comments');
            queryClient.setQueryData('Get-Comments', (old) => {
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
            queryClient.invalidateQueries('Get-Comments');
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

    const mutationDeleteRepComment = useMutation({
        mutationFn: DeleteRepCommentOfUserService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-Comments');
            const previousValue = queryClient.getQueryData('Get-Comments');
            queryClient.setQueryData('Get-Comments', (old) => {
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
            queryClient.invalidateQueries('Get-Comments');
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

    const mutationUpdateRepComment = useMutation({
        mutationFn: UpdateRepCommentService,
        onMutate: async (Data) => {
            await queryClient.cancelQueries('Get-Comments');
            const previousValue = queryClient.getQueryData('Get-Comments');
            queryClient.setQueryData('Get-Comments', (old) => {
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
            queryClient.invalidateQueries('Get-Comments');
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
            setDataComments(data.data);
        }
    }, [data])

    useEffect(() => {
        if (isRead !== null && commentRef.current) {

            console.log('scroll');

            commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isRead, commentRef.current, commentRef]);

    const { Formik } = formik;

    const schema = yup.object().shape({
        content: yup.string()
            .min(2, 'Bình luận phải ít nhất 5 ký tự')
            .max(500, 'Bình luận không được vượt quá 500 ký tự'),
    });

    const handleRepComment = (item) => {
        if (user.isLogin === false) {
            toast.warning(`🐉 Bạn cần đăng nhập để trả lời bình luận`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (isRepcomment === item.id) {
            setIsRepcomment('');
        } else {
            setIsRepcomment(item.id);
        }
    }

    const handleDeleteComment = async (item) => {

        await mutationDeleteComment.mutateAsync({
            token: user.token,
            comment_id: item.id
        })
    }

    const handleDeleteRepComment = async (item) => {
        await mutationDeleteRepComment.mutateAsync({
            token: user.token,
            repcomment_id: item.id
        })
    }

    const handleUpdateComment = (item) => {
        if (IsUpdateComment === item.id) {
            setIsUpdateComment('');
        } else {

            setIsUpdateComment(item.id);
        }
    }

    const handleUpdateRepComment = (item) => {
        if (IsUpdateRepComment === item.id) {
            setIsUpdateRepComment('');
        } else {
            setIsUpdateRepComment(item.id);
        }
    }

    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={async (values, { resetForm }) => {
                    if (user.isLogin === false) {
                        toast.warning(`🐉 Bạn cần đăng nhập để bình luận`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        return;
                    }
                    await mutationCreateComment.mutateAsync({
                        token: user.token,
                        user_id: user.userId,
                        truyen_id: truyenId,
                        content: values.content
                    })

                    resetForm({
                        values: { content: '' },
                    });

                }}
                initialValues={{
                    content: '',
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div className='CommentComponent__main__comment'>
                            <div className='CommentComponent__main__comment__title'>
                                <FaComment />
                                <span>Bình Luận (39)</span>
                            </div>
                            <div className='CommentComponent__main__comment__message'>

                                <formik.Field
                                    as="textarea"
                                    name='content'
                                    value={values.content}
                                    onChange={handleChange}
                                    placeholder="Để lại bình luận ở đây"
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        outline: 'none'
                                    }}
                                />
                                <formik.ErrorMessage style={{ color: 'red' }} name="content" component="div" className="error" />
                            </div>
                            <div className='CommentComponent__main__comment__button'>
                                <button type='submit'>Gửi</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className='CommentComponent__main__listComment'>
                {dataComments.map((item, index) => (
                    <article key={item.id} className='CommentComponent__main__listComment__item'>
                        <div className='CommentComponent__main__listComment__item__content'>
                            <div className='CommentComponent__main__listComment__item__content__avartar'>
                                <img loading='lazy' crossOrigin='anonymous' src={
                                    item.User.avatar === null ?
                                        avartarNotUser :
                                        `${process.env.REACT_APP_DB_HOST}/public${item.User.avatar}`
                                } alt="avart" />
                            </div>
                            <div className='CommentComponent__main__listComment__item__content__comment'>
                                <div className='CommentComponent__main__listComment__item__content__comment__name'>
                                    <strong>{item.User.username}</strong>
                                </div>
                                {IsUpdateComment === item.id ? (
                                    <Formik
                                        validationSchema={schema}
                                        onSubmit={async (values) => {
                                            //note update comment
                                            await mutationUpdateComment.mutateAsync({
                                                token: user.token,
                                                comment_id: item.id,
                                                content: values.content
                                            })
                                            setIsUpdateComment('');

                                        }}
                                        initialValues={{
                                            content: item.content,
                                        }}
                                    >
                                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                                            <Form noValidate onSubmit={handleSubmit}>
                                                <formik.Field
                                                    as="textarea"
                                                    name='content'
                                                    value={values.content}
                                                    onChange={handleChange}
                                                    placeholder="Để lại bình luận ở đây"
                                                    style={{
                                                        width: '100%',
                                                        height: '100px',
                                                        padding: '10px',
                                                        borderRadius: '5px',
                                                        outline: 'none'
                                                    }}
                                                />
                                                <formik.ErrorMessage style={{ color: 'red' }} name="content" component="div" className="error" />
                                                <div className='RepComment__button'>
                                                    <button type='submit'>Cập nhập</button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                ) : (
                                    <div
                                        ref={Number(isRead) === item.id ? commentRef : null}
                                        className={`CommentComponent__main__listComment__item__content__comment__text`}
                                    >
                                        <p>{item.content}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='CommentComponent__main__listComment__item__content2'>
                            <span onClick={() => handleRepComment(item)} >Trả lời</span>
                            {user.userId === item.User.id && (
                                <span onClick={() => handleUpdateComment(item)} style={{ color: 'green' }}>Sửa</span>
                            )}
                            {user.userId === item.User.id && (
                                <span onClick={() => handleDeleteComment(item)} style={{ color: 'red' }}>Xóa</span>
                            )}
                        </div>

                        {item.RepComments.map((item, index) => (
                            <div key={item.id}>
                                <div className='CommentComponent__main__listComment__item__contentRep'>
                                    <div className='CommentComponent__main__listComment__item__content__avartar'>
                                        <img loading='lazy' crossOrigin='anonymous' src={
                                            item.User.avatar === null ?
                                                avartarNotUser :
                                                `${process.env.REACT_APP_DB_HOST}/public${item.User.avatar}`
                                        } alt="avart" />
                                    </div>
                                    <div className='CommentComponent__main__listComment__item__contentRep__comment'>
                                        <div className='CommentComponent__main__listComment__item__content__comment__name'>
                                            <strong>{item.User.username}</strong>
                                        </div>

                                        {/* note update rep comment */}

                                        {IsUpdateRepComment === item.id ? (
                                            <Formik
                                                validationSchema={schema}
                                                onSubmit={async (values) => {
                                                    //note update rep comment

                                                    await mutationUpdateRepComment.mutateAsync({
                                                        token: user.token,
                                                        repcomment_id: item.id,
                                                        content: values.content
                                                    })

                                                    setIsUpdateRepComment('');

                                                }}
                                                initialValues={{
                                                    content: item.content,
                                                }}
                                            >
                                                {({ handleSubmit, handleChange, values, touched, errors }) => (
                                                    <Form noValidate onSubmit={handleSubmit}>
                                                        <formik.Field
                                                            as="textarea"
                                                            name='content'
                                                            value={values.content}
                                                            onChange={handleChange}
                                                            placeholder="Để lại bình luận ở đây"
                                                            style={{
                                                                width: '100%',
                                                                height: '100px',
                                                                padding: '10px',
                                                                borderRadius: '5px',
                                                                outline: 'none'
                                                            }}
                                                        />
                                                        <formik.ErrorMessage style={{ color: 'red' }} name="content" component="div" className="error" />
                                                        <div className='RepComment__button'>
                                                            <button type='submit'>Cập nhập</button>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        ) : (
                                            <div className='CommentComponent__main__listComment__item__content__comment__text'>
                                                <p>{item.content}</p>
                                            </div>
                                        )}
                                    </div>
                                    {item.User.id === user.userId && (
                                        <span onClick={() => handleUpdateRepComment(item)} style={{ color: 'green', cursor: 'pointer' }}>sửa</span>
                                    )}
                                    {item.User.id === user.userId && (
                                        <span onClick={() => handleDeleteRepComment(item)} style={{ color: 'red', cursor: 'pointer' }}>Xóa</span>
                                    )}
                                </div>
                            </div>
                        ))}
                        <Formik
                            validationSchema={schema}
                            onSubmit={async (values, { resetForm }) => {
                                await mutationCreateRepComment.mutateAsync({
                                    token: user.token,
                                    user_id: user.userId,
                                    comment_id: item.id,
                                    content: values.content
                                })

                                resetForm({
                                    values: { content: '' },
                                });

                                setIsRepcomment('');

                            }}
                            initialValues={{
                                content: '',
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form
                                    style={{ display: isRepcomment === item.id ? 'block' : 'none' }}
                                    noValidate onSubmit={handleSubmit}>
                                    <div className='RepComment'>
                                        <div className='RepComment__message'>

                                            <formik.Field
                                                as="textarea"
                                                name='content'
                                                value={values.content}
                                                onChange={handleChange}
                                                placeholder="Để lại bình luận ở đây"
                                                style={{
                                                    width: '100%',
                                                    height: '100px',
                                                    padding: '10px',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }}
                                            />
                                            <formik.ErrorMessage style={{ color: 'red' }} name="content" component="div" className="error" />
                                        </div>
                                        <div className='RepComment__button'>
                                            <button type='submit'>Gửi</button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>


                    </article>

                ))}
                {/* <Pagination className="justify-content-center my-4">
                    <Pagination.First onClick={() => handleClick(1)} disabled={active === 1} />
                    <Pagination.Prev onClick={() => handleClick(active - 1)} disabled={active === 1} />
                    {paginationItems}
                    <Pagination.Next onClick={() => handleClick(active + 1)} disabled={active === totalPages} />
                    <Pagination.Last onClick={() => handleClick(totalPages)} disabled={active === totalPages} />
                </Pagination> */}
            </div>
        </>
    )
}

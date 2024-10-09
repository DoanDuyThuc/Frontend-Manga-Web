import React, { useState } from 'react'
import * as formik from 'formik';
import * as yup from 'yup';
import { Pagination } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import { FaComment } from 'react-icons/fa';
import avartarNotUser from '../../public/images/avartarNotUser.jpg'

import './CommentComponent.scss'


export const CommentComponent = () => {

    const [active, setActive] = useState(1);
    const totalPages = Math.ceil(30 / 5);

    const paginationItems = [];

    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => handleClick(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }

    const handleClick = (pageNumber) => {
        setActive(pageNumber);
    };


    const { Formik } = formik;

    const schema = yup.object().shape({
        comment: yup.string()
            .min(5, 'Bình luận phải ít nhất 5 ký tự')
            .max(500, 'Bình luận không được vượt quá 500 ký tự'),
    });
    return (
        <>
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    console.log(values);
                }}
                initialValues={{
                    comment: '',
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
                                    name='comment'
                                    value={values.comment}
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
                                <formik.ErrorMessage style={{ color: 'red' }} name="comment" component="div" className="error" />
                            </div>
                            <div className='CommentComponent__main__comment__button'>
                                <button type='submit'>Gửi</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            <div className='CommentComponent__main__listComment'>
                <article className='CommentComponent__main__listComment__item'>
                    <div className='CommentComponent__main__listComment__item__content'>
                        <div className='CommentComponent__main__listComment__item__content__avartar'>
                            <img src={avartarNotUser} alt="avart" />
                        </div>
                        <div className='CommentComponent__main__listComment__item__content__comment'>
                            <div className='CommentComponent__main__listComment__item__content__comment__name'>
                                <strong>Nguyễn Văn A</strong>
                            </div>
                            <div className='CommentComponent__main__listComment__item__content__comment__text'>
                                <p>ra thêm nữa nha</p>
                            </div>
                        </div>
                    </div>
                </article>
                <article className='CommentComponent__main__listComment__item'>
                    <div className='CommentComponent__main__listComment__item__content'>
                        <div className='CommentComponent__main__listComment__item__content__avartar'>
                            <img src={avartarNotUser} alt="avart" />
                        </div>
                        <div className='CommentComponent__main__listComment__item__content__comment'>
                            <div className='CommentComponent__main__listComment__item__content__comment__name'>
                                <strong>Nguyễn Văn A</strong>
                            </div>
                            <div className='CommentComponent__main__listComment__item__content__comment__text'>
                                <p>ra thêm nữa nha</p>
                            </div>
                        </div>
                    </div>
                </article>
                <article className='CommentComponent__main__listComment__item'>
                    <div className='CommentComponent__main__listComment__item__content'>
                        <div className='CommentComponent__main__listComment__item__content__avartar'>
                            <img src={avartarNotUser} alt="avart" />
                        </div>
                        <div className='CommentComponent__main__listComment__item__content__comment'>
                            <div className='CommentComponent__main__listComment__item__content__comment__name'>
                                <strong>Nguyễn Văn A</strong>
                            </div>
                            <div className='CommentComponent__main__listComment__item__content__comment__text'>
                                <p>ra thêm nữa nha</p>
                            </div>
                        </div>
                    </div>
                </article>

                <Pagination className="justify-content-center my-4">
                    <Pagination.First onClick={() => handleClick(1)} disabled={active === 1} />
                    <Pagination.Prev onClick={() => handleClick(active - 1)} disabled={active === 1} />
                    {paginationItems}
                    <Pagination.Next onClick={() => handleClick(active + 1)} disabled={active === totalPages} />
                    <Pagination.Last onClick={() => handleClick(totalPages)} disabled={active === totalPages} />
                </Pagination>
            </div>
        </>
    )
}

import React from 'react'
import './DetailChapterPage.scss'
import { NavLink } from 'react-bootstrap'
import { MdError } from 'react-icons/md'
import { BiSolidErrorAlt } from 'react-icons/bi'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { CommentComponent } from '../../Components/CommentComponent/CommentComponent'

export const DetailChapterPage = () => {
    return (
        <div className='DetailChapterPage'>
            <div className='DetailChapterPage__Hold'>

                <div className='DetailChapterPage__Hold__Control'>
                    <div>
                        <ol className='DetailChapterPage__Hold__Control__path'>
                            <li>
                                <NavLink to='/'>Trang chủ</NavLink>
                            </li>
                            /
                            <li>
                                <NavLink to='/'>One Piece</NavLink>
                            </li>
                            /
                            <li>
                                <NavLink to='/'>Chap 1</NavLink>
                            </li>
                        </ol>
                    </div>

                    <div className='DetailChapterPage__Hold__Control__Title'>
                        <h1>
                            <NavLink to='/'>One Piece</NavLink>
                            - <span>Chapter 1</span>
                        </h1>

                        <time datetime="2024-10-03T06:37:10+07:00">(Cập nhật lúc: 15:37 03/10/2024)</time>
                    </div>

                    <div className='DetailChapterPage__Hold__Control__Server'>
                        <div className='DetailChapterPage__Hold__Control__Server__convert'>
                            <span>Nếu không xem được truyện vui lòng đổi "SERVER HÌNH" bên dưới</span>
                            <div className='DetailChapterPage__Hold__Control__Server__convert__btn'>
                                <NavLink to='/'>Server 1</NavLink>
                            </div>
                        </div>

                        <div className='DetailChapterPage__Hold__Control__Server__rperror'>
                            <NavLink to='/'>
                                <MdError />
                                Báo Lỗi Chương
                            </NavLink>
                        </div>
                    </div>

                    <div className='DetailChapterPage__Hold__Control__Server__AlertInfo'>
                        <BiSolidErrorAlt />
                        <em>Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter</em>
                    </div>

                    <div className='DetailChapterPage__Hold__Control__Server__navigate'>
                        <NavLink to='/'>
                            <FaArrowLeft />
                            <span>Chap trước</span>
                        </NavLink>
                        <NavLink to='/'>
                            <span> Chap sau</span>
                            <FaArrowRight />
                        </NavLink>
                    </div>
                </div>

                <div className='DetailChapterPage__Hold__Content'>
                    <div style={{ overflow: 'hidden' }}>
                        <div className='DetailChapterPage__Hold__Content__chapter'>
                            <img
                                className='DetailChapterPage__Hold__Content__chapter__img lazy'
                                src="https://comic.2886b34bc4d6b7dbcfb8fec2f604f053.r2.cloudflarestorage.com/one-piece/chapter-1/one-piece-0.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=6a0668b7685da6d21d71abc52cdfe8a6%2F20241003%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20241003T173041Z&X-Amz-Expires=3600&X-Amz-Signature=81b0b514d850106b25ebc5e657b2473421a6c0311980255a921306828033523a&X-Amz-SignedHeaders=host&x-id=GetObject"
                                alt=""
                            />
                        </div>

                        <div className='DetailChapterPage__Hold__Content__chapter'>
                            <img
                                className='DetailChapterPage__Hold__Content__chapter__img lazy'
                                src="https://comic.2886b34bc4d6b7dbcfb8fec2f604f053.r2.cloudflarestorage.com/one-piece/chapter-1/one-piece-1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=6a0668b7685da6d21d71abc52cdfe8a6%2F20241003%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20241003T173041Z&X-Amz-Expires=3600&X-Amz-Signature=7c089f15855f9d87d5d28cb88c49ec8e301573d78e8d794c5ee578a495ecfdef&X-Amz-SignedHeaders=host&x-id=GetObject"
                                alt=""
                            />
                        </div>

                        <div className='DetailChapterPage__Hold__Content__chapter'>
                            <img
                                className='DetailChapterPage__Hold__Content__chapter__img lazy'
                                src="https://comic.2886b34bc4d6b7dbcfb8fec2f604f053.r2.cloudflarestorage.com/one-piece/chapter-1/one-piece-1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=6a0668b7685da6d21d71abc52cdfe8a6%2F20241003%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20241003T173041Z&X-Amz-Expires=3600&X-Amz-Signature=7c089f15855f9d87d5d28cb88c49ec8e301573d78e8d794c5ee578a495ecfdef&X-Amz-SignedHeaders=host&x-id=GetObject"
                                alt=""
                            />
                        </div>

                        <div className='DetailChapterPage__Hold__Content__chapter'>
                            <img
                                className='DetailChapterPage__Hold__Content__chapter__img lazy'
                                src="https://comic.2886b34bc4d6b7dbcfb8fec2f604f053.r2.cloudflarestorage.com/one-piece/chapter-1/one-piece-2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=6a0668b7685da6d21d71abc52cdfe8a6%2F20241003%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20241003T173041Z&X-Amz-Expires=3600&X-Amz-Signature=98fd6eb447469cf7fe63005e57ea4f2d250f2b574f63a31c6eada5c5ab29d4f6&X-Amz-SignedHeaders=host&x-id=GetObject"
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <div className='DetailChapterPage__Hold__Control'>
                    <div className='DetailChapterPage__Hold__Control__Server__navigate'>
                        <NavLink to='/'>
                            <FaArrowLeft />
                            <span>Chap trước</span>
                        </NavLink>
                        <NavLink to='/'>
                            <span> Chap sau</span>
                            <FaArrowRight />
                        </NavLink>
                    </div>

                    <div>
                        <ol className='DetailChapterPage__Hold__Control__path'>
                            <li>
                                <NavLink to='/'>Trang chủ</NavLink>
                            </li>
                            /
                            <li>
                                <NavLink to='/'>One Piece</NavLink>
                            </li>
                            /
                            <li>
                                <NavLink to='/'>Chap 1</NavLink>
                            </li>
                        </ol>
                    </div>

                </div>

                <div className='DetailChapterPage__Hold__Comment'>
                    <CommentComponent />
                </div>
            </div>
        </div>
    )
}

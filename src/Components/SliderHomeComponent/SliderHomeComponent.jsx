import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaStar } from "react-icons/fa";
import Slider from 'react-slick';
import './SliderHomeComponent.scss';
import { FaAngleRight } from "react-icons/fa";
import { CartItemComponent } from '../CartItemComponent/CartItemComponent';


const SliderHomeComponent = () => {

    //custom arrow
    function NextArrow(props) {
        const { onClick } = props;
        return (
            <div
                className={`NextArrow`}

                onClick={onClick}
            >
                <FaAngleRight />
            </div>
        );
    }

    function PrevArrow(props) {
        const { onClick } = props;
        return (
            <div
                className={'PrevArrow'}
                onClick={onClick}
            >

                <FaAngleLeft />
            </div>
        );
    }

    // Cấu hình slider
    const settings = {
        dots: false, // Hiển thị các dấu chấm chỉ báo
        infinite: true, // Vòng lặp vô hạn
        speed: 500, // Tốc độ chuyển đổi
        slidesToShow: 6, // Số slide hiển thị trên một màn hình
        slidesToScroll: 1, // Số slide chuyển khi scroll
        autoplay: true, // Tự động chạy slide
        autoplaySpeed: 2000, // Tốc độ tự động chuyển slide (2 giây)
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1200, // <= 1200px
                settings: {
                    slidesToShow: 5, // Hiển thị 4 slide cho màn hình lớn vừa
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 992, // <= 992px
                settings: {
                    slidesToShow: 4, // Hiển thị 3 slide cho màn hình tablet
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768, // <= 768px
                settings: {
                    slidesToShow: 3, // Hiển thị 2 slide cho màn hình nhỏ
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576, // <= 576px
                settings: {
                    slidesToShow: 2, // Hiển thị 1 slide cho màn hình điện thoại
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className='SliderHomeComponent'>

            <h2 className='SliderHomeComponent__Title'>
                <div>
                    <FaStar />
                    <p>Truyện Hay</p>
                </div>
            </h2>
            <Slider  {...settings}>
                <CartItemComponent />
                <CartItemComponent />
                <CartItemComponent />
                <CartItemComponent />
                <CartItemComponent />
                <CartItemComponent />
                <CartItemComponent />
                <CartItemComponent />
                <CartItemComponent />

            </Slider>
        </div>
    );
}

export default SliderHomeComponent;

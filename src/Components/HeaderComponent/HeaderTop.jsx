import React from 'react'
import './HeaderComponent.scss'
import { IoSearch } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa";
import Logo1 from '../../public/images/logo1.png'
import User from '../../public/images/user.png'
import { Button } from 'react-bootstrap';

export const HeaderTop = () => {
    return (
        <div className='HeaderComponent__Top'>
            <div className='HeaderComponent__Top__middle'>
                <div className='HeaderComponent__Top__middle__Left'>
                    <a href='/' className='HeaderComponent__Top__middle__Left__logo'>
                        <img src={Logo1} alt='logo' />
                    </a>

                    <button className='HeaderComponent__Top__middle__Left__darkMode'>
                        <FaRegLightbulb />
                    </button>

                    <div className='HeaderComponent__Top__middle__Left__Search' >
                        <input className='HeaderComponent__Top__middle__Left__Search__SearchInput' placeholder='Search' />
                        <button className='HeaderComponent__Top__middle__Left__Search__SearchButton'><IoSearch /></button>
                    </div>
                </div>

                <div className='HeaderComponent__Top__middle__Right'>
                    {/* <span className='HeaderComponent__Top__middle__Right__UserName'>Thucdn04</span>
                    <span className='HeaderComponent__Top__middle__Right__Manager'>
                        <Image width={50} height={50} preview={false} src={User} alt='user' />
                    </span> */}

                    <Button variant="primary" size="sm" >Đăng Ký</Button>
                    <Button variant="primary" size="sm" >Đăng Nhập</Button>
                </div>
            </div>
        </div>
    )
}

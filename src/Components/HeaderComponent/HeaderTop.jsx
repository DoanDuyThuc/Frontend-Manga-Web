import React, { useEffect, useState } from 'react'
import './HeaderComponent.scss'
import { IoSearch } from "react-icons/io5";

import Logo1 from '../../public/images/logo1.png'
import User from '../../public/images/user.png'
import { Button, Image, Modal } from 'react-bootstrap';
import { FormLoginSigninComponent } from '../FormLoginSigninComponent/FormLoginSigninComponent';
import { ButtonLoginSignin } from '../ButtonLoginSignin/ButtonLoginSignin';
import { ControlUserComponent } from '../ControlUserComponent/ControlUserComponent';
import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const HeaderTop = () => {

    const user = useSelector(state => state?.user);

    const [showForm, setShowForm] = useState(false);
    const [isFormNow, setisFormNow] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = (e) => {

        setisFormNow(e.target.id)

        setShowForm(true)
    };

    // handle
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
    };

    const handleSearchBtn = () => {
        if (searchTerm) {
            navigate(`/guest/truyen-moi-cap-nhat/?search=${searchTerm}`);
        } else {
            navigate('/');
        }
    }

    return (

        <>
            <div className='HeaderComponent__Top'>
                <div className='HeaderComponent__Top__middle'>
                    <div className='HeaderComponent__Top__middle__Left'>
                        <NavLink to={'/'} className='HeaderComponent__Top__middle__Left__logo'>
                            <img loading='lazy' src={Logo1} alt='logo' />
                        </NavLink>

                        <div className='HeaderComponent__Top__middle__Left__Search' >
                            <input
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        if (searchTerm) {
                                            navigate(`/guest/truyen-moi-cap-nhat/?search=${searchTerm}`);
                                        } else {
                                            navigate('/');
                                        }
                                    }
                                }}
                                onChange={(event) => handleSearchChange(event)}
                                className='HeaderComponent__Top__middle__Left__Search__SearchInput' placeholder='Search' />
                            <button onClick={() => handleSearchBtn()} className='HeaderComponent__Top__middle__Left__Search__SearchButton'><IoSearch /></button>
                        </div>
                    </div>

                    <div className='HeaderComponent__Top__middle__Right'>

                        {user.isLogin ? (
                            <ControlUserComponent />

                        ) : (
                            <ButtonLoginSignin handleShowForm={handleShowForm} />
                        )}
                    </div>
                </div>
            </div>

            <Modal centered show={showForm} onHide={handleCloseForm}>
                <FormLoginSigninComponent setisFormNow={setisFormNow} isFormNow={isFormNow} setShowForm={setShowForm} />
            </Modal>
        </>
    )
}

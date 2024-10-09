import React, { useState } from 'react'
import './HeaderComponent.scss'
import { IoSearch } from "react-icons/io5";

import Logo1 from '../../public/images/logo1.png'
import User from '../../public/images/user.png'
import { Button, Image, Modal } from 'react-bootstrap';
import { FormLoginSigninComponent } from '../FormLoginSigninComponent/FormLoginSigninComponent';
import { ButtonLoginSignin } from '../ButtonLoginSignin/ButtonLoginSignin';
import { ControlUserComponent } from '../ControlUserComponent/ControlUserComponent';

export const HeaderTop = () => {

    const [showForm, setShowForm] = useState(false);
    const [isFormNow, setisFormNow] = useState('');

    const handleCloseForm = () => setShowForm(false);
    const handleShowForm = (e) => {

        setisFormNow(e.target.id)

        setShowForm(true)
    };


    return (

        <>
            <div className='HeaderComponent__Top'>
                <div className='HeaderComponent__Top__middle'>
                    <div className='HeaderComponent__Top__middle__Left'>
                        <a href='/' className='HeaderComponent__Top__middle__Left__logo'>
                            <img src={Logo1} alt='logo' />
                        </a>

                        <div className='HeaderComponent__Top__middle__Left__Search' >
                            <input className='HeaderComponent__Top__middle__Left__Search__SearchInput' placeholder='Search' />
                            <button className='HeaderComponent__Top__middle__Left__Search__SearchButton'><IoSearch /></button>
                        </div>
                    </div>

                    <div className='HeaderComponent__Top__middle__Right'>
                        <ControlUserComponent />

                        {/* <ButtonLoginSignin handleShowForm={handleShowForm} /> */}
                    </div>
                </div>
            </div>

            <Modal centered show={showForm} onHide={handleCloseForm}>
                <FormLoginSigninComponent setisFormNow={setisFormNow} isFormNow={isFormNow} />
            </Modal>
        </>
    )
}

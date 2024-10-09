import React from 'react'
import { Button } from 'react-bootstrap'

export const ButtonLoginSignin = ({ handleShowForm }) => {
    return (
        <>
            <Button id='dangky' onClick={handleShowForm} variant="primary" size="sm" >Đăng Ký</Button>
            <Button id='dangnhap' onClick={handleShowForm} variant="primary" size="sm" >Đăng Nhập</Button>
        </>
    )
}

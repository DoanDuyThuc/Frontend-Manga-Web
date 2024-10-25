import axios from "axios";

import { axiosInstance } from "../Config/axiosInstance";

export const SignInService = async ({ username, email, password }) => {

    try {
        const response = await axiosInstance.post('/user/signin', { username, email, password });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const LoginInService = async ({ email, password }) => {
    try {
        const response = await axiosInstance.post('/user/login', { email, password }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const LogoutService = async () => {
    try {
        const response = await axiosInstance.post('/user/logout', {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetProfile = async (token) => {
    try {
        const response = await axiosInstance.get(`/user/getInfo`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const UpdateProfileService = async ({ token, formData }) => {

    try {
        const response = await axiosInstance.patch(`/user/updateUser`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const ChangePasswordService = async ({ token, oldPassword, newPassword }) => {

    try {
        const response = await axiosInstance.patch(`/user/changePassword`, { oldPassword, newPassword }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetAllUserService = async (token, page, limit, search) => {

    try {
        const response = await axiosInstance.get(`/user/getAllUser?page=${page}&limit=${limit}&search=${search}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const DeleteUserService = async ({ token, ids }) => {

    try {
        const response = await axiosInstance.delete(`/user/deleteUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {
                ids: ids
            }
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetInfoUpdateService = async ({ token, id }) => {

    try {
        const response = await axiosInstance.get(`/user/getInfoupdate/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const UpdateInfoUserService = async ({ token, id, username, email, role, point }) => {

    try {
        const response = await axiosInstance.put(`/user/updateInfoUser/${id}`, { username, email, role, point }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
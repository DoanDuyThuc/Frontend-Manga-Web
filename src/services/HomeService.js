import { axiosInstance } from "../Config/axiosInstance";

export const GetTruyenHomeService = async ({ page, limit, search, quoc_gia, isOver, typeManga }) => {

    try {
        const response = await axiosInstance.get(`/home/getAll-Truyen-Home?page=${page}&limit=${limit}&search=${search}&quoc_gia=${quoc_gia}&isOver=${isOver}&typeManga=${typeManga}`, {},
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetChuongHomeService = async ({ truyenid, chuongid }) => {

    try {
        const response = await axiosInstance.get(`/home/getChuong-Truyen-Home/${truyenid}/${chuongid}`, {},
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const AddFollowTruyenService = async ({ token, truyen_id, user_id }) => {

    try {
        const response = await axiosInstance.post(`/home/addFollowTruyen`, { truyen_id, user_id },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetFollowTruyenService = async ({ token, user_id }) => {

    try {
        const response = await axiosInstance.get(`/home/getAllFollowTruyen?user_id=${user_id}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const DeleteFollowTruyenService = async ({ token, truyen_id, user_id }) => {

    try {
        const response = await axiosInstance.delete(`/home/deleteFollowTruyen?truyen_id=${truyen_id}&user_id=${user_id}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const AddLichSuTruyenService = async ({ token, truyen_id, user_id }) => {

    try {
        const response = await axiosInstance.post(`/home/addLichSuTruyen`, { truyen_id, user_id },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetLichSuTruyenService = async ({ token, user_id }) => {

    try {
        const response = await axiosInstance.get(`/home/getAllLichSuTruyen?user_id=${user_id}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const DeleteLichSuTruyenService = async ({ token, truyen_id, user_id }) => {

    try {
        const response = await axiosInstance.delete(`/home/deleteLichSuTruyen?truyen_id=${truyen_id}&user_id=${user_id}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const UpdateLuotXemService = async ({ truyen_id }) => {

    try {
        const response = await axiosInstance.post(`/home/updateLuotXem`, { truyen_id },
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
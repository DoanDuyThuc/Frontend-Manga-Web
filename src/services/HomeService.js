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

export const CreateCommentService = async ({ token, user_id, truyen_id, content }) => {

    try {
        const response = await axiosInstance.post(`/home/createComment`, { user_id, truyen_id, content },
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

export const GetAllCommentService = async ({ truyenId }) => {

    try {
        const response = await axiosInstance.get(`/home/getAllComment?truyen_id=${truyenId}`, {},
            {
                withCredentials: true,
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const CreateRepCommentService = async ({ token, user_id, comment_id, content }) => {

    try {
        const response = await axiosInstance.post(`/home/createRepComment`, { user_id, comment_id, content },
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

export const DeleteCommentService = async ({ token, comment_id }) => {

    try {
        const response = await axiosInstance.delete(`/home/deleteComment?comment_id=${comment_id}`, {},
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

export const GetAllCommentOfUserService = async ({ token, userId }) => {

    try {
        const response = await axiosInstance.get(`/home/getAllCommentOfUser?user_id=${userId}`, {},
            {
                withCredentials: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const UpdateStatusCommentOfUserService = async ({ token, comment_id, IsRead, IsShow }) => {

    try {
        const response = await axiosInstance.patch(`/home/updateStatusCommentOfUser`, { comment_id, IsRead, IsShow },
            {
                withCredentials: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const UpdateCommentOfUserService = async ({ token, comment_id, content }) => {

    try {
        const response = await axiosInstance.patch(`/home/updateComment`, { comment_id, content },
            {
                withCredentials: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const DeleteRepCommentOfUserService = async ({ token, repcomment_id }) => {

    try {
        const response = await axiosInstance.delete(`/home/deleteRepComment?repcomment_id=${repcomment_id}`, {},
            {
                withCredentials: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const UpdateRepCommentService = async ({ token, repcomment_id, content }) => {

    try {
        const response = await axiosInstance.patch(`/home/updateRepComment`, { repcomment_id, content },
            {
                withCredentials: true,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
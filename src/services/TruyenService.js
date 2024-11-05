import { axiosInstance } from "../Config/axiosInstance";

export const GetAllTruyenService = async (page, limit, search, searchStatus) => {
    try {
        const response = await axiosInstance.get(`/truyen-tranh/getAll-truyen?page=${page}&limit=${limit}&search=${search}&searchStatus=${searchStatus}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const CreateTruyenService = async ({ token, data }) => {

    try {
        const response = await axiosInstance.post(`/truyen-tranh/create-truyen`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

export const DeleteTruyenService = async ({ token, ids }) => {

    try {
        const response = await axiosInstance.delete(`/truyen-tranh/delete-truyen`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    ids: ids
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

export const GetTruyenService = async ({ truyen_ma }) => {

    try {
        const response = await axiosInstance.get(`/truyen-tranh/get-truyen/${truyen_ma}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const UpdateTruyenService = async ({ token, data, truyen_ma }) => {

    try {
        const response = await axiosInstance.put(`/truyen-tranh/update-truyen/${truyen_ma}`, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

export const GetChuongTruyenService = async ({ id, ChuongId }) => {

    try {
        const response = await axiosInstance.get(`/truyen-tranh/get-chuong/${id}?ChuongId=${ChuongId}`, {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const CreateNewChuongService = async ({ token, Chuong_so, Chuong_ten, Chuong_noidung, TruyenId }) => {

    try {
        const response = await axiosInstance.post(`/truyen-tranh/create-chuong`, { Chuong_so, Chuong_ten, Chuong_noidung, TruyenId }, {
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

export const CreateNewImageChuongService = async ({ formData }) => {

    try {
        const response = await axiosInstance.post(`/truyen-tranh/addImages-chuong`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Authorization: `Bearer ${token}`
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

export const DeleteChuongService = async ({ token, ChuongId }) => {

    try {
        const response = await axiosInstance.delete(`/truyen-tranh/delete-chuong`,
            {
                data: { ChuongId }
            },
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

export const DeleteImagesChuongService = async ({ token, imagePath }) => {

    try {
        const response = await axiosInstance.delete(`/truyen-tranh/delete-image`,
            {
                data: { imagePath }
            },
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

export const UpdateSortImageChuongService = async ({ token, ChuongId, images }) => {

    try {
        const response = await axiosInstance.post(`/truyen-tranh/sort-image/${ChuongId}/saveOrder`,
            {
                images
            },
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

export const UpdateChuongService = async ({ token, id, Chuong_so, Chuong_ten, Chuong_noidung, TruyenId }) => {

    try {
        const response = await axiosInstance.patch(`/truyen-tranh/updateInfo-chuong/${id}`,
            {
                Chuong_so,
                Chuong_ten,
                Chuong_noidung,
                TruyenId
            },
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

export const GetAllTheLoaiService = async ({ page, limit, search }) => {

    try {
        const response = await axiosInstance.get(`/truyen-tranh/getAll-theloai?page=${page}&limit=${limit}&search=${search}`, {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const UpdateTheLoaiService = async ({ token, id, ten_theloai }) => {

    try {
        const response = await axiosInstance.put(`/truyen-tranh/updata-theloai`, { id, ten_theloai },
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

export const CreateTheLoaiService = async ({ token, ten_theloai }) => {

    try {
        const response = await axiosInstance.post(`/truyen-tranh/create-theloai`, { ten_theloai }, {
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

export const DeleteTheLoaiService = async ({ token, ids }) => {

    try {
        const response = await axiosInstance.delete(`/truyen-tranh/delete-theloai`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    ids: ids
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

export const AddTheLoaiForTruyenService = async ({ token, TruyenId, TheLoaiIds }) => {

    try {
        const response = await axiosInstance.post(`/truyen-tranh/add-theloaiTruyen`, { TruyenId, TheLoaiIds: TheLoaiIds }, {
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

export const DeleteTheLoaiForTruyenService = async ({ token, TruyenId, TheLoaiId }) => {

    try {
        const response = await axiosInstance.delete(`/truyen-tranh/remove-theloaiforTruyen?TruyenId=${TruyenId}&TheLoaiId=${TheLoaiId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
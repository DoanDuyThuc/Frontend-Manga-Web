import { axiosInstance } from "../Config/axiosInstance";

export const GetTruyenForAuthorService = async ({ token, page, limit, search, searchStatus }) => {

    try {
        const response = await axiosInstance.get(`/author/getAll-Truyen-Author?page=${page}&limit=${limit}&search=${search}&searchStatus=${searchStatus}`, {},
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
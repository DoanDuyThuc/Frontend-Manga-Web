import axios from "axios";

export const API_URL = process.env.REACT_APP_DB_HOST;

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const refreshAccessToken = async () => {
    try {
        const response = await axiosInstance.post('/user/refresh-token', {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

axiosInstance.interceptors.request.use(
    (config) => {
        // Thêm access token vào header nếu có
        const accessToken = localStorage.getItem('token'); // Hoặc từ nơi bạn lưu trữ token
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra xem có phải lỗi 401 không
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Đánh dấu yêu cầu đã được thử lại
            try {
                const newAccessToken = await refreshAccessToken(); // Làm mới access token
                localStorage.setItem('token', newAccessToken?.access_token); // Lưu access token mới
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken?.access_token}`;
                return axiosInstance(originalRequest); // Thực hiện lại yêu cầu ban đầu
            } catch (refreshError) {
                console.error('Không thể làm mới access token', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


//nghiên cứu thêm về axios interceptor và refresh token (note còn lỗi khi refresh token)
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
        console.error("Error refreshing access token:", error);
        return null;
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

let isRefreshing = false;
let requestQueue = [];

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Kiểm tra lỗi 401
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Nếu đang có một yêu cầu làm mới token, thêm request vào hàng đợi
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    requestQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            isRefreshing = true;
            try {
                const newAccessToken = await refreshAccessToken();
                localStorage.setItem('token', newAccessToken?.access_token);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken?.access_token}`;

                // Gọi lại các request trong hàng đợi
                requestQueue.forEach((prom) => prom.resolve(newAccessToken?.access_token));
                requestQueue = []; // Reset hàng đợi
                isRefreshing = false;

                return axiosInstance(originalRequest); // Thực hiện lại yêu cầu ban đầu
            } catch (refreshError) {
                console.error('Không thể làm mới access token', refreshError);

                // Từ chối các request trong hàng đợi nếu làm mới thất bại
                requestQueue.forEach((prom) => prom.reject(refreshError));
                requestQueue = []; // Reset hàng đợi
                isRefreshing = false;

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
import axios from 'axios';
// import { useStore } from "@/store/sto";
// import { ILog } from "@/service/ILogin";

export const API_URL = 'http://192.168.0.143:8000';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
});

$api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const { data } = await axios.get(`${API_URL}/jwt/refresh`, {
                    withCredentials: true,
                });

                localStorage.setItem('token', data.access_token);
                return $api.request(originalRequest);
            } catch (e) {
                console.log('Failed to refresh token:', e);
            }
        }
        throw error;
    }
);

export default $api;
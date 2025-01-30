import axios from 'axios';
import { AuthResponse } from "../AuthResponse";
import { useStore } from "../store/store";

export const API_URL = `http://localhost:3000/api`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    const store = useStore();
    if (store.isAuth) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<AuthResponse>(`${API_URL}/jwt/login`, {
                    withCredentials: true,
                });

                window.localStorage.setItem('sad', 'sadsa');

                window.localStorage.setItem('token', );
                return $api.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН');
            }
        }
        throw error;
    }
);

export default $api;
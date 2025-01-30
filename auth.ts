import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';// импортируем тип хранилища auth

interface IAuthPluginOptions {
    axiosInstance?: AxiosInstance;
}

const authPlugin = ({axiosInstance}: IAuthPluginOptions) => {
    const api = axiosInstance || axios.create({baseURL: 'http://localhost:3000'});

    api.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem('token'); // используем свойство token из хранилища auth
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    const login = async (email: string, password: string) => {
        const response = await api.post('/jwt/login/', {
            email,
            password,
        });
        const {access_token} = response.data;
        localStorage.setItem('token', access_token);
        return response.data;
    };

    const logout = () => {
        localStorage.setItem('token', 'null');
    };

    const getCurrentUser = async () => {

        const token = localStorage.getItem('token'); // используем свойство token из хранилища auth
        if (!token) {
            return null;
        }
        const response = await api.get('/jwt/users/me/');
        return response.data;

    };

    return {
        install(app: any) {
            app.config.globalProperties.$auth = {
                login,
                logout,
                getCurrentUser,
            };
        },
    };
};

export default authPlugin;
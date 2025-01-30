import { defineStore } from 'pinia';
import AuthService from '@/service/AuthService';
import axios from 'axios';
import {API_URL} from "../http";
import {ILog} from "@/service/ILogin";


export const useStore = defineStore({
    id: 'main',
    state: (): {
        user: ILog;
        isAuth: boolean;
        isLoading: boolean;
    } => ({
        user: {} as ILog,
        isAuth: false,
        isLoading: false,
    }),
    actions: {
        setAuth(bool: boolean) {
            this.isAuth = bool;
        },
        setUser(user: ILog) {
            this.user = user;
        },
        setLoading(bool: boolean) {
            this.isLoading = bool;
        },
        async login(username: string, password: string) {
            try {
                const response = await AuthService.login(username, password);
                console.log(response)
                localStorage.setItem('token', response.data.access_token);
                this.setAuth(true);
                // this.setUser(response.data.user);
            } catch (e) {
                // console.log(e.response?.data?.message);
            }
        },
        async checkAuth() {
            this.setLoading(true);
            try {
                const response = await axios.get<ILog>(`${API_URL}/jwt/login`, {withCredentials: true})
                console.log(response);
                localStorage.setItem('token', response.data.access_token);
                this.setAuth(true);
                // this.setUser(response.data.user);
            } catch (e) {
                // console.log(e.response?.data?.message);
            } finally {
                this.setLoading(false);
            }
        },
    },
});
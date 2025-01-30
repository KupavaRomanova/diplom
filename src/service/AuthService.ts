import $api from "../http";
import { AxiosResponse } from 'axios';
import { ILog } from "./ILogin";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<ILog>> {
        return $api.post<ILog>('/login', { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<ILog>> {
        return $api.post<ILog>('/registration', { email, password });
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
}
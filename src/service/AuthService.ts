import $api from "../http";
import { AxiosResponse } from 'axios';
import { ILog } from "./ILogin";

export default class AuthService {
    static async login(username: string, password: string): Promise<AxiosResponse<ILog>> {
        return $api.post<ILog>('/jwt/login', { username, password });
    }
}
import {ILog} from "../service/ILogin";

export interface AuthResponse {
    access_token: string;
    // refreshToken: string;
    user: ILog;
}
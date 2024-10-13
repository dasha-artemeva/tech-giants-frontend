import BaseService from "../BaseService";
import {LoginOrRegisterDto, RetrieveUserDto, UpdateUserDto, UserSchema} from "./schemas.ts";

export class AuthService extends BaseService{
    path = 'auth'
    async login(data: LoginOrRegisterDto): Promise<RetrieveUserDto>{
        const response = await this.request(
            (api) => api.post<RetrieveUserDto>(`${this.path}/login/`, {json: data})
        );
        return UserSchema.parse(await response.json());
    }
    async register(data: LoginOrRegisterDto): Promise<RetrieveUserDto>{
        const response = await this.request(
            (api) => api.post<RetrieveUserDto>(`${this.path}/register/`, {json: data})
        );
        return UserSchema.parse(await response.json());
    }

    async logout(): Promise<void>{
        await this.request(
            (api) => api.post(`${this.path}/logout/`)
        );
    }

    async me(): Promise<RetrieveUserDto>{
        const response = await this.request(
            (api) => api.get<RetrieveUserDto>(`${this.path}/user/`)
        );
        return UserSchema.parse(await response.json());
    }

    async patch(data: UpdateUserDto): Promise<RetrieveUserDto>{
        const response = await this.request(
            (api) => api.patch<RetrieveUserDto>(`${this.path}/user/`, {json: data})
        );
        return UserSchema.parse(await response.json());
    }
}

export const authService = new AuthService();
export default authService;

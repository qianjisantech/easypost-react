// src/api/auth.ts
import request from '@/api';
import type {AxiosPromise} from 'axios';

// ==================== 类型定义 ====================
export interface LoginParams {
    email: string;
    password: string;
}

export interface RegisterParams {
    email: string;
    password: string;
    verificationCode: string;
}

export interface EmailCodeParams {
    email: string;
}

export interface AuthResponse {
    token: string;
}

// ==================== API 函数 ====================
const AuthAPI = {
    /**
     * 邮箱登录
     * @param data 登录参数
     */
    loginByEmail: (data: LoginParams): AxiosPromise<AuthResponse> =>
        request.post('/auth/email/login', data),

    /**
     * 邮箱注册
     * @param data 注册参数
     */
    registerByEmail: (data: {email: string; code: string }): AxiosPromise<AuthResponse> =>
        request.post('/auth/email/register', data),

    /**
     * 发送邮箱验证码
     * @param data 邮箱参数
     */
    sendEmailCode: (data: EmailCodeParams): AxiosPromise<void> =>
        request.post('/auth/email/sendCode', data),
};

export default AuthAPI;
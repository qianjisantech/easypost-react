// src/api/auth.ts
import request from '@/api/index';
import type {AxiosPromise} from 'axios';
import {ApiResponse} from "@/api/types";

// ==================== 类型定义 ====================
export interface LoginParams {
    email: string;
    password: string;
}

export interface RegisterParams {
    email: string;
    password: string;
    code: string;
}

export interface EmailCodeParams {
    email: string;
}

export interface LoginByEmailResponse extends ApiResponse{
    token: string;
    user_id: number;
    email: string;
    username:string;
    phone: string;
}

// ==================== API 函数 ====================
const AuthAPI = {
    /**
     * 邮箱登录
     * @param data 登录参数
     */
    login_by_email: (data: LoginParams): AxiosPromise<LoginByEmailResponse> =>
        request.post('/auth/email/login', data),

    /**
     * 邮箱注册
     * @param data 注册参数
     */
    register_by_email: (data: { code: string; email: string }): AxiosPromise<LoginByEmailResponse> =>
        request.post('/auth/email/register', data),

    /**
     * 发送邮箱验证码
     * @param data 邮箱参数
     */
    send_email_code: (data: EmailCodeParams): AxiosPromise<void> =>
        request.post('/auth/email/sendCode', data),
};

export default AuthAPI;
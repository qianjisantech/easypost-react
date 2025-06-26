// src/api/user.ts
import request from '@/api/index';
import type {AxiosPromise} from 'axios';
import {PageResult} from "@/api/types";

// ==================== 类型定义 ====================
export interface UserPageParams {
    pageNum: number;
    pageSize: number;
    username?: string;
    email?: string;
    status?: number;
}

export interface UserProfileResponse {
    id: number;
    username: string;
    email: string;
    avatar: string;
    roles: string[];
    permissions: string[];
}

export interface UserActionsParams {
    userId: number;
    actionType: 'enable' | 'disable' | 'delete';
}

export interface SetPasswordParams {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

// ==================== API 函数 ====================
const UserAPI = {
    /**
     * 分页查询用户列表
     * @param params 查询参数
     */
    queryPage: (params: UserPageParams): AxiosPromise<PageResult<UserProfileResponse>> =>
        request.post('/user/page', params),

    /**
     * 获取当前用户个人信息
     */
    getProfile: (): AxiosPromise<UserProfileResponse> =>
        request.get('/user/profile'),

    /**
     * 用户操作（启用/禁用/删除）
     * @param params 操作参数
     */
    actions: (params: UserActionsParams): AxiosPromise<void> =>
        request.post('/user/actions', params),

    /**
     * 修改密码
     * @param params 密码参数
     */
    setPassword: (params: { password: any }): AxiosPromise<void> =>
        request.post('/user/setPassword', params),
};

export default UserAPI;
// src/api/team.ts
import request from '@/api';
import type { AxiosPromise } from 'axios';

// ==================== 类型定义 ====================
export interface Team {
    id: string;
    name: string;
}

export interface TeamMember {
    current:number
    pageSize: number
    teamId: string
}

export interface TeamSettings {
    teamId: string;
    privacy: 'public' | 'private';
    joinMethod: 'invite' | 'free';
    notificationSettings: {
        email: boolean;
        inApp: boolean;
    };
}

export interface PageQueryParams {
    pageNum: number;
    pageSize: number;
    keyword?: string;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PageResponse<T> {
    total: number;
    list: T[];
    pageNum: number;
    pageSize: number;
}

const TeamAPI = {
    /**
     * 分页查询团队列表
     */
    queryPage: (params: PageQueryParams): AxiosPromise<PageResponse<Team>> =>
        request.post('/team/page', params),

    /**
     * 创建团队
     */
    create: (data: Omit<Team, 'id'>): AxiosPromise<{ name: string }> =>
        request.post('/team/create', data),

    /**
     * 更新团队信息
     */
    update: (data: Partial<Team> & { id: string }): AxiosPromise<void> =>
        request.put('/team/update', data),

    /**
     * 删除团队
     */
    delete: (id: string): AxiosPromise<void> =>
        request.delete(`/team/delete/${id}`),

    /**
     * 获取团队详情
     */
    getDetail: (id: string): AxiosPromise<Team> =>
        request.get(`/team/detail/${id}`),

    /**
     * 分页查询团队成员
     */
    queryMembers: (params: {
        current: number
        teamId: string
        pageSize: number
    }): AxiosPromise<PageResponse<TeamMember>> =>
        request.post('/team/member/page', params),

    /**
     * 邀请团队成员
     */
    inviteMembers: (data: {
        teamId: string;
        userIds: string[];
        role?: 'admin' | 'member';
    }): AxiosPromise<{ successCount: number; failCount: number }> =>
        request.post('/team/member/invite', data),

    /**
     * 搜索团队用户
     */
    searchUsers: (params: { current: number; teamId: any; pageSize: number; keyword: any }): AxiosPromise<Array<{
        userId: string;
        username: string;
        avatar?: string
    }>> => request.post('/team/user/search', params),

    /**
     * 获取团队设置详情
     */
    getSettings: (id: string): AxiosPromise<TeamSettings> =>
        request.get(`/team/settings/detail/${id}`)
};

export default TeamAPI;
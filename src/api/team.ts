// src/api/team.ts
import request from '@/api/index';
import type { AxiosPromise } from 'axios';

// ==================== 类型定义 ====================
export interface Team {
    id: string;
    name: string;
    role_type: number;
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

export interface PageResponse<T> {
    total: number;
    list: T[];
    pageNum: number;
    pageSize: number;
}

const TeamAPI = {
    /**
     * 查询团队列表
     */
    query: (): AxiosPromise<PageResponse<Team>> =>
        request.get('/team/query'),

    /**
     * 创建团队
     */
    create: (data: Omit<Team, 'id'>): AxiosPromise<{ name: string }> =>
        request.post('/team', data),

    /**
     * 更新团队信息
     */
    update: (data: Partial<Team> & { id: string }): AxiosPromise<void> =>
        request.put('/team', data),

    /**
     * 删除团队
     */
    delete: (id: string): AxiosPromise<void> =>
        request.delete(`/team/${id}`),

    /**
     * 团队详情
     */
    detail: (): AxiosPromise<void> =>
        request.get(`/team/detail`),
    /**
     * 分页查询团队成员
     */
    memberpage: (params: {
        current: number
        name: string
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
    getSetting: (): AxiosPromise<TeamSettings> =>
        request.get(`/team/setting`)
};

export default TeamAPI;
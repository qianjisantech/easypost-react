import request from '@/api';
import type { AxiosPromise } from 'axios';

// ==================== 类型定义 ====================
export interface Project {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  createTime?: string;
  updateTime?: string;
  status?: 'active' | 'archived';
  teamId?: string;
}

export interface ProjectQueryParams {
  name: string;
}

export interface ProjectCreateParams {
  name: string;
  description?: string;
  teamId?: string;
}

export interface ProjectUpdateParams extends Partial<ProjectCreateParams> {
  id: string;
}

export interface ProjectCopyParams {
  sourceId: string;
  newName: string;
  teamId?: string;
}

export interface PageResponse<T> {
  total: number;
  list: T[];
  pageNum: number;
  pageSize: number;
}

const ProjectAPI = {
  /**
   * 分页查询项目列表
   * @param params 查询参数
   */
  page: (params: ProjectQueryParams): AxiosPromise<PageResponse<Project>> =>
      request.post('/project/page', params),

  /**
   * 创建项目
   * @param data 项目创建参数
   */
  create: (data: ProjectCreateParams): AxiosPromise<{ id: string }> =>
      request.post('/project', data),

  /**
   * 更新项目信息
   * @param data 项目更新参数
   */
  update: (data: ProjectUpdateParams): AxiosPromise<void> =>
      request.put('/project', data),

  /**
   * 复制项目
   * @param data 项目复制参数
   */
  copy: (data: { sourceId: string; newName: string; teamId: string; id: string }): AxiosPromise<{ id: string }> =>
      request.post('/project/copy', data),

  /**
   * 删除项目
   * @param id 项目ID
   */
  delete: (id: string): AxiosPromise<void> =>
      request.delete(`/project/${id}`),

  /**
   * 获取项目详情
   * @param id 项目ID
   */
  detail: (id: string): AxiosPromise<Project> =>
      request.get(`/project/${id}`),

  /**
   * 归档项目
   * @param id 项目ID
   */
  archive: (id: string): AxiosPromise<void> =>
      request.post(`/project/archive/${id}`),

  /**
   * 恢复项目
   * @param id 项目ID
   */
  restore: (id: string): AxiosPromise<void> =>
      request.post(`/project/restore/${id}`)
};

export default ProjectAPI;
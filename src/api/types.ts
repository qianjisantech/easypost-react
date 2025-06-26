 // 定义响应数据类型
 export interface ApiResponse<T = any> {
    success: boolean
    message?: string
    data?: T
    [key: string]: any
}

 // src/api/types.ts
 export interface PageParams {
     pageNum: number;
     pageSize: number;
 }

 export interface PageResult<T> {
     list: T[];
     total: number;
     pageNum: number;
     pageSize: number;
 }
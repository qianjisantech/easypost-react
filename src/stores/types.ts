// store/types.ts
import {ApiResponse} from "@/api/types";

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

export interface AppState {
    auth: AuthState;
}

export interface LoginParams {
    email: string;
    password: string;
}


export interface LoginByEmailResponse{
    token: string;
    user_id: number;
    email: string;
    username:string;
    phone: string;
}

export  interface  User {
    user_id: number;
    email: string;
    username:string;
    phone: string;
}
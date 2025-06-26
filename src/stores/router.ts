// stores/auth.ts  权限相关全局存储
import {create} from 'zustand'
import {persist, StateStorage} from 'zustand/middleware'
import AuthAPI from '@/api/auth'
import type {LoginParams, User} from './types'

type RouterState = {
     x_team_id:string
     x_project_id:string
}

type RouterActions = {
    LoginByEmail: (params: LoginParams) => Promise<void>
    UpdateUser: (payload: Partial<User>) => void
    Logout: () => void
}
const X_Team_Id = 'X-Team-Id'     //当前project_id
const X_Project_Id = 'X-Project-Id'  //当前team_id
const router_storage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        try {
            return localStorage.getItem(name)
                ? JSON.stringify({
                    state: JSON.parse(localStorage.getItem(name)),
                    version: 0
                })
                : null;
        } catch (e) {
            console.error('Failed to get localStorage data', e);
            return null;
        }
    },
    setItem: async (name: string, value: any): Promise<void> => {
        try {
            console.debug('JSON.stringify(value.state)', JSON.stringify(value.state))

            localStorage.setItem(name, JSON.stringify(value.state));
            if (value.state.token){
                localStorage.setItem(X_Team_Id, value.state.token);
            }else {
                localStorage.removeItem(X_Team_Id);
            }
        } catch (e) {
            console.error('Failed to set localStorage data', e);
        }
    },
    removeItem: async (name: string): Promise<void> => {
        localStorage.removeItem(name);
    }
};

const use_router_store = create<RouterState & RouterActions>()(
    persist(
        (set, get) => ({
            token: null,
            current_user: null,
            loading: false,
            error: null,
            is_authenticated: false,

            LoginByEmail: async (params) => {
                set({loading: true, error: null})
                try {
                    const {data} = await AuthAPI.login_by_email(params)
                    if (data?.success) {
                        set({
                            token: data.data.token,
                            current_user:{
                                user_id: data.data.user_id,
                                email: data.data.email,
                                phone: data.data.phone,
                                username: data.data.username
                            },
                            is_authenticated: true,
                            loading: false
                        })
                    } else {
                        set({
                            token: null,
                            current_user: null,
                            is_authenticated: false,
                            error: data?.message || '登录失败',
                            loading: false
                        })

                        throw  new  Error(data?.message || '登录失败')
                    }
                } catch (error) {
                    set({
                        error: error instanceof Error ? error.message : '登录失败',
                        loading: false
                    })
                    throw error
                }
            },

            UpdateUser: (payload) => {
                const {current_user} = get()
                if (current_user) {
                    set({current_user: {...current_user, ...payload}})
                }
            },

            Logout: () => {
                set({
                    token: null,
                    current_user: null,
                    is_authenticated: false
                })
            }
        }),
        {
            name: X_Team_Id,
            storage: router_storage
        }
    )
)

export default use_router_store
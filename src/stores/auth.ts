import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AuthAPI from "@/api/auth";

// 单独存储 token 的键名
const TOKEN_STORAGE_KEY = 'token';
const Session_STORAGE_KEY = 'session';
const useAuthStore = create(
    persist(
        (set) => ({
            // 用户信息
            user: null,
            token: null,
            isAuthenticated: false,

            // 登录方法
            loginByEmail: async (credentials) => {
                try {
                    // 调用登录API
                    const response = await AuthAPI.login_by_email(credentials)

                    if (!response.data.success) {
                        throw new Error(response.data.message || '登录失败');
                    }

                    // 额外将 token 存储到 localStorage
                    if (response.data.data.token) {
                        localStorage.setItem(TOKEN_STORAGE_KEY, response.data.data.token);
                    }

                    // 更新状态
                    set({
                        user: {
                            user_id:response.data.data.user_id,
                            username:response.data.data.username,
                            phone:response.data.data.phone,
                            email:response.data.data.email,
                        },
                        token: response.data.data.token,
                        isAuthenticated: true,
                    });

                    return ;
                } catch (error) {
                    console.error('登录错误:', error);
                    throw error;
                }
            },

            // 退出方法
            logout: async () => {
                // 清除额外存储的 token
                localStorage.removeItem(TOKEN_STORAGE_KEY);

                // 清除状态
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                });
            },

            // 初始化方法
            initialize: () => {
                // 从 localStorage 读取额外存储的 token
                const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
                const { user, token } = useAuthStore.getState();

                // 如果 Zustand 存储中没有 token，但 localStorage 中有，则使用 localStorage 的
                const effectiveToken = token || storedToken;

                set({
                    token: effectiveToken,
                    isAuthenticated: !!user && !!effectiveToken,
                });
            },
        }),
        {
            name: Session_STORAGE_KEY, // Zustand 持久化的键名
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token
            }),
        }
    )
);

export default useAuthStore;
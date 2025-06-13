'use client';

import React, {createContext, useContext, useEffect, useState} from 'react';
import {Provider as NiceModalProvider} from '@ebay/nice-modal-react';
import { Modal} from 'antd';
import {MenuHelpersContextProvider} from '@/contexts/menu-helpers';
import {EnvironmentSetting} from '@/types';
import {GlobalContextData} from '@/contexts/types';
import {useTeamsContext} from '@/contexts/teams';
import {RouterGuard} from "@/contexts/RouterGuard";

const GlobalContext = createContext<GlobalContextData | undefined>(undefined);

export function GlobalContextProvider({children}: React.PropsWithChildren) {
    const [modal, modalContextHolder] = Modal.useModal();
    const [isLogin, setIsLogin] = useState(false);
    const [needSetPassword, setNeedSetPassword] = useState(false);
    const [environmentSettingContext, setEnvironmentSettingContext] = useState<EnvironmentSetting>({} as EnvironmentSetting);
    useEffect(() => {
        // 确保在客户端环境执行
        if (typeof window === 'undefined') return;
        // 获取 token 并转换为 boolean
        const hasToken = !!localStorage.getItem('token');

        // 避免不必要的状态更新
        if (hasToken !== isLogin) {
            setIsLogin(hasToken);
        }
    }, []);
    // 使用独立的 teams hook
    const {teams, fetchTeams, setTeams} = useTeamsContext();

    const contextValue: GlobalContextData = {
        modal,
        isLogin,
        setIsLogin,
        teams,
        fetchTeams,
        setTeams,
        needSetPassword,
        setNeedSetPassword,
        environmentSettingContext,
        setEnvironmentSettingContext
    };

    return (
        <MenuHelpersContextProvider>
            <NiceModalProvider>
                <GlobalContext.Provider value={contextValue}>
                    <RouterGuard> {/* 包裹路由守卫 */}
                        {children}
                    </RouterGuard>
                    {modalContextHolder}
                </GlobalContext.Provider>
            </NiceModalProvider>
        </MenuHelpersContextProvider>
    );
}

// 安全的上下文访问hook
export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider');
    }
    return context;
}
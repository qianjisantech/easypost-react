'use client';

import React, { createContext, useContext, useState } from 'react';
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react';
import { Modal } from 'antd';
import { MenuHelpersContextProvider } from '@/contexts/menu-helpers';
import { EnvironmentSetting } from '@/types';
import { GlobalContextData } from '@/contexts/types';
import { useTeamsContext } from '@/contexts/teams';
import { RouterGuard } from "@/contexts/router-guard";
import { GlobalLoading } from '@/components/loading/GlobalLoading';

const GlobalContext = createContext<GlobalContextData | undefined>(undefined);

export function GlobalContextProvider({ children }: React.PropsWithChildren) {
    const [modal, modalContextHolder] = Modal.useModal();
    const [needSetPassword, setNeedSetPassword] = useState(false);
    const [globalLoading, setGlobalLoading] = useState(false);
    const [environmentSettingContext, setEnvironmentSettingContext] = useState<EnvironmentSetting>({} as EnvironmentSetting);
    const { teams, fetchTeams, setTeams } = useTeamsContext();

    const contextValue: GlobalContextData = {
        modal,
        teams,
        fetchTeams,
        setTeams,
        needSetPassword,
        setNeedSetPassword,
        environmentSettingContext,
        setEnvironmentSettingContext,
        globalLoading,
        setGlobalLoading,
    };

    return (
      <MenuHelpersContextProvider>
          <NiceModalProvider>
              <GlobalContext.Provider value={contextValue}>
                  <RouterGuard>
                      {children}
                      {/* 全局加载组件 */}
                      {globalLoading && <GlobalLoading fullScreen />}
                  </RouterGuard>
                  {modalContextHolder}
              </GlobalContext.Provider>
          </NiceModalProvider>
      </MenuHelpersContextProvider>
    );
}

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider');
    }
    return context;
}
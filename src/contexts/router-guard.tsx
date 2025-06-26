'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTES } from '@/utils/routes'
import { useGlobalContext } from '@/contexts/global'
import {safeLocalStorage} from "@/utils/storage";

export function RouterGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const { teams, fetchTeams } = useGlobalContext()

   const token =safeLocalStorage.getItem('token')

    useEffect(() => {
          console.log('实时监听',token)
        if (token===''||token==null) {
            router.replace(ROUTES.LOGIN)
        } else {
            // router.push(pathname)
            handleRouteValidation()
            console.log('当前路由',pathname)
        }


    }, [token,pathname]);

    const handleRouteValidation = async () => {
        try {
            let currentTeams = teams;

            if (currentTeams.length === 0) {
                await fetchTeams();
                currentTeams = teams;
            }

            // 处理/main路径
            if (pathname === ROUTES.MAIN) {
                if (currentTeams.length > 0) {
                    router.replace(ROUTES.TEAMS(currentTeams[0].id));
                    return;
                }
                return;
            }

            // 处理/login和/home路径
            if (pathname === ROUTES.LOGIN || pathname === ROUTES.HOME) {
                router.replace(currentTeams.length > 0
                    ? ROUTES.TEAMS(currentTeams[0].id)
                    : ROUTES.MAIN);
                return;
            }

            // 处理团队路径
            if (pathname.startsWith(ROUTES.TEAMS(''))) {
                const teamId = pathname.split('/teams/')[1];

                if (currentTeams.length === 0) {
                    router.replace(ROUTES.MAIN);
                    return;
                }

                const isValidTeam = currentTeams.some(team => team.id === teamId);
                if (!isValidTeam) {
                    router.replace(ROUTES.TEAMS(currentTeams[0].id));
                }
            }
        } catch (error) {
            console.error('路由验证失败:', error);
            router.replace(ROUTES.MAIN);
        }
    }


    return <>{children}</>;
}
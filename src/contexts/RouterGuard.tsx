'use client'

import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ROUTES } from '@/utils/routes'
import { useGlobalContext } from '@/contexts/global'

export function RouterGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const pathname = usePathname()
    const { isLogin, teams, fetchTeams } = useGlobalContext()

    useEffect(() => {
        // 认证路由规则
        if (!isLogin) {
            if (pathname !== ROUTES.LOGIN) {
                router.replace(ROUTES.LOGIN)
            }
            return
        }

        const handleRouteValidation = async () => {
            try {
                let currentTeams = teams

                // 如果团队列表为空，先获取数据
                if (currentTeams.length === 0) {
                    await fetchTeams()
                    currentTeams = teams // 获取更新后的teams
                }

                // 处理/main路径
                if (pathname === ROUTES.MAIN) {
                    if (currentTeams.length > 0) {
                        // 有团队则重定向到第一个团队
                        router.replace(ROUTES.TEAMS(currentTeams[0].id))
                        return
                    }
                    // 没有团队则保持在/main
                    return
                }

                // 处理/login和/home路径
                if (pathname === ROUTES.LOGIN || pathname === ROUTES.HOME) {
                    router.replace(currentTeams.length > 0
                        ? ROUTES.TEAMS(currentTeams[0].id)
                        : ROUTES.MAIN)
                    return
                }

                // 处理团队路径
                if (pathname.startsWith(ROUTES.TEAMS(''))) {
                    const teamId = pathname.split('/teams/')[1]

                    // 检查团队列表是否为空
                    if (currentTeams.length === 0) {
                        router.replace(ROUTES.MAIN)
                        return
                    }

                    // 验证团队ID有效性
                    const isValidTeam = currentTeams.some(team => team.id === teamId)

                    if (!isValidTeam) {
                        router.replace(ROUTES.TEAMS(currentTeams[0].id))
                    }
                }
            } catch (error) {
                console.error('路由验证失败:', error)
                router.replace(ROUTES.MAIN)
            }
        }

        handleRouteValidation()
    }, [pathname, isLogin]) // 注意：移除了teams依赖避免循环

    return <>{children}</>
}
// /src/app/(main)/layout.tsx
'use client'
import { Layout, theme } from 'antd'
import { usePathname } from 'next/navigation'
import HeaderPage from '@/app/(main)/header'

import { LayoutProvider } from '@/contexts/layout-settings'
import { useCssVariable } from '@/hooks/useCssVariable'
import { ROUTES } from "@/utils/routes"
import Sidebar from "@/app/(main)/main/Sidebar";

const { Content } = Layout

export default function MainLayout(props: React.PropsWithChildren) {
    const { token } = theme.useToken()
    const cssVar = useCssVariable()
    const pathname = usePathname()

    return (
        <div style={{
            backgroundColor: token.colorFillTertiary,
            ...cssVar,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* 只有当前路径不是 /login 时才展示 HeaderPage */}
            {pathname !== ROUTES.LOGIN && <HeaderPage />}

            <div style={{
                flex: 1,
                overflow: 'hidden',
                display: 'flex',
                backgroundColor: token.colorBgContainer,
                borderRadius: 10,
            }}>
                {/* 添加侧边栏 - 非登录页显示 */}
                {pathname !== ROUTES.LOGIN && <Sidebar />}

                <Content style={{
                    flex: 1,
                    padding: '16px',
                    overflow: 'auto',
                }}>
                    <LayoutProvider>
                        {props.children}
                    </LayoutProvider>
                </Content>
            </div>
        </div>
    )
}
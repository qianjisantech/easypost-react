// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App } from 'antd'
import '@/styles/globals.css'
import { GlobalContextProvider } from '@/contexts/global'
import { getPageTitle } from '@/utils'
import { SpeedInsights } from '@vercel/speed-insights/next'
import React, {Suspense} from "react";
import Loading from "@/app/loading";
export const metadata: Metadata = {
    icons: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    title: getPageTitle(),
    description: '使用 Next.js + Antd 编写的 API网站',
    authors: [{ name: '', url: '' }],
    manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
    colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="zh-Hans-CN" suppressHydrationWarning>
        <body suppressHydrationWarning>
        <AntdRegistry>
            <App>
                    <GlobalContextProvider>
                        <Suspense fallback={<Loading />}>
                            {children}
                        </Suspense>
                        <SpeedInsights />
                    </GlobalContextProvider>
            </App>
        </AntdRegistry>
        </body>
        </html>
    )
}
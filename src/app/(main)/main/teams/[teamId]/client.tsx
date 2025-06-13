'use client'
import { useState } from 'react'
import { Layout } from 'antd'
import Sidebar from '@/app/(main)/main/Sidebar'
import TeamsContent from '@/app/(main)/main/teams/[teamId]/components/TeamContent'

const { Content, Sider } = Layout

export default function TeamClientPage({ teamId }: { teamId: string }) {
    const [loading, setLoading] = useState(false)

    return (
        <Layout style={{
            display: 'flex',
            height: '100vh',
            flexDirection: 'row', // 明确指定横向布局
        }}>
            {/* 右侧内容 - 自动填充 */}
            <Content style={{
                flex: 1,
                overflow: 'auto',
                minWidth: 0 ,// 防止内容溢出
            }}>
                <TeamsContent loading={loading} teamId={teamId} />
            </Content>
        </Layout>
    )
}
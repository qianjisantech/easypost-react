'use client'
import { Layout } from 'antd'
import Sidebar from '@/app/(main)/main/Sidebar'
import MainContent from "@/app/(main)/main/content";
import CollaborationDashboard from "@/app/(main)/main/collaborationdashboard/page";

const { Content, Sider } = Layout

export default function MainPage() {
    return (
        <Layout style={{
            display: 'flex',
            height: '100vh',
            flexDirection: 'row', // 明确指定横向布局
        }}>
            {/* 左侧菜单 - 固定宽度 */}
            <Sider
                width={300}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'sticky',
                    left: 0,
                    top: 0,
                    bottom: 0
                }}
            >
                <Sidebar />
            </Sider>

            {/* 右侧内容 - 自动填充 */}
            <Content style={{
                flex: 1,
                overflow: 'auto',
                minWidth: 0 ,// 防止内容溢出
            }}>

                <MainContent  />
                <CollaborationDashboard></CollaborationDashboard>
            </Content>
        </Layout>
    )
}
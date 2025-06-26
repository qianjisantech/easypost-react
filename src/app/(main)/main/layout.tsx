'use client'
import { Layout, Menu } from 'antd'
import React from "react"
import{MainSideBar} from "@/app/(main)/main/sidebar";
import HeaderPage from "@/app/(main)/header";
import styles from './layout.module.css'; // 创建对应的CSS模块文件

const { Header, Content, Footer, Sider } = Layout

export default function MainLayout(props: React.PropsWithChildren) {
    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: 'rgb(242, 244, 247)',
        height: '5vh',
        lineHeight: '5vh',
        backgroundColor: 'rgb(242, 244, 247)',
        width: '100%',
        margin: '0 auto',
        padding: 0,
    };

    const contentStyle: React.CSSProperties = {
        padding: '2%',
        overflow: 'auto',
        flex: 1,
        color: '#fff',
        backgroundColor: '#fff',
        marginRight: '1%',
        borderRadius: '0 8px 8px 8px',
        height: '93vh',
    };

    const siderStyle: React.CSSProperties = {
        backgroundColor: 'white', // 确保背景色一致
        overflow: 'auto',
        marginLeft: '1%',
        borderRadius: '8px 0 8px 8px',
        height: '93vh',
    };

    const innerLayoutStyle: React.CSSProperties = {
        width: '100%',
        height: '93vh', // 调整为与内容区相同高度
        backgroundColor: 'rgb(242, 244, 247)',
        display: 'flex',
    };

    return (
        <Layout style={{backgroundColor: '#fff' }}>
            <Header style={headerStyle}>
                <HeaderPage />
            </Header>
            <Layout style={innerLayoutStyle}>
                <Sider
                    width="18%"
                    style={siderStyle}
                    breakpoint="lg"
                    collapsedWidth="0"
                >
                    <div className={styles.sidebarContainer}>
                        <MainSideBar />
                    </div>
                </Sider>
                <Content style={contentStyle}>
                    {props.children || 'Main Content'}
                </Content>
            </Layout>
        </Layout>
    )
}
import React from 'react';
import { Menu, Layout, ConfigProvider } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import ProjectPage from "@/app/(main)/project/[projectId]/page";

const { Sider, Content } = Layout;

const SideBar = () => {


    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemBg: '#f5f5f5',
                        itemHoverBg: '#e8e8e8',
                        itemSelectedBg: '#d9d9d9',
                        itemHeight: 80,
                        itemMarginInline: 0,
                        itemPaddingInline: 0,
                    },
                },
            }}
        >
            <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'row' }}>
                <Sider width={100} style={{ background: '#f0f0f0' }} >
                    <Menu
                        mode="vertical"
                        defaultSelectedKeys={['1']}
                        style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                        }}
                    >
                        {[
                            { key: '0', icon: <HomeOutlined />, label: '首页' },
                            { key: '1', icon: <HomeOutlined />, label: '接口管理' },
                            { key: '2', icon: <SettingOutlined />, label: '自动化测试' },
                            { key: '3', icon: <UserOutlined />, label: '项目设置' },
                            { key: '4', icon: <SettingOutlined />, label: '在线分享' },
                            { key: '5', icon: <UserOutlined />, label: '请求历史' },
                        ].map((item) => (
                            <Menu.Item
                                key={item.key}
                                style={{
                                    height: '60px',
                                    width: '80px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '0 auto 16px',
                                    padding: '16px 20px',
                                    gap: '16px',
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%',
                                    lineHeight: 1,
                                }}>
                                    <div style={{
                                        fontSize: 25,
                                        marginBottom: 5,
                                    }}>{item.icon}</div>
                                    <div style={{
                                        fontSize: 12,
                                        marginTop: 5,
                                    }}>{item.label}</div>
                                </div>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
            </Layout>
        </ConfigProvider>
    );
};

export default SideBar;
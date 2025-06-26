import {Menu, Modal} from 'antd';
import React, {useEffect} from 'react';
import { MenuProps } from 'antd/lib/menu';
import {
    KeyOutlined,
    LinkOutlined, SafetyCertificateOutlined,
    SettingOutlined, SkinOutlined, ToolOutlined
} from "@ant-design/icons";


interface SettingsModalProps {
    visible: boolean;
    currentUser: any;
    onCancel: () => void;
    onMenuClick: MenuProps['onClick'];
    activeTab: string;
    content: Record<string, React.ReactNode>;
    onEdit: (field: string, label: string, value: any, rules?: any[]) => void;
    fieldRules: Record<string, any[]>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
                                                                              visible,
                                                                              currentUser,
                                                                              onCancel,
                                                                              onMenuClick,
                                                                              activeTab,
                                                                              content,
                                                                              onEdit,
                                                                              fieldRules,
                                                                          }) => {
    useEffect(() => {
        console.log('activeTab',activeTab)
    }, [activeTab]);


    return (

        <Modal
            footer={null}
            open={visible}
            width={900}
            onCancel={onCancel}
        >
            <div style={{ display: 'flex' }}>
                <Menu
                    mode="inline"
                    selectedKeys={[activeTab]}
                    style={{ width: '25%', borderRight: 0, height: '70vh' }}
                    onClick={onMenuClick}
                >
                    <Menu.ItemGroup key="settings" title="设置">
                        <Menu.Item key="appearance" icon={<SkinOutlined />}>
                            外观
                        </Menu.Item>
                        <Menu.Item key="general" icon={<ToolOutlined />}>
                            通用
                        </Menu.Item>
                        <Menu.Item key="certificates" icon={<SafetyCertificateOutlined />}>
                            证书管理
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu>
                <div style={{ flex: 1, paddingLeft: 16 }}>{content[activeTab]}</div>
            </div>
        </Modal>


    );
};
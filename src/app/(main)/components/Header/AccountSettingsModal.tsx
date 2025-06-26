import {Descriptions, Button, Menu, Modal} from 'antd';
import React, {useEffect} from 'react';
import { MenuProps } from 'antd/lib/menu';
import {
    KeyOutlined,
    LinkOutlined,
    SettingOutlined
} from "@ant-design/icons";
import {EditModal} from "@/app/(main)/components/Header/EditModal";

interface AccountSettingsModalProps {
    visible: boolean;
    currentUser: any;
    onCancel: () => void;
    onMenuClick: MenuProps['onClick'];
    activeTab: string;
    content: Record<string, React.ReactNode>;
    onEdit: (field: string, label: string, value: any, rules?: any[]) => void;
    fieldRules: Record<string, any[]>;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
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
                    style={{ width: '25%', borderRight: 0,height:'70vh' }}
                    onClick={onMenuClick}
                >
                    <Menu.ItemGroup key="accountInfo" title="账号信息">
                        <Menu.Item key="basicSettings" icon={<SettingOutlined />}>
                            基本设置
                        </Menu.Item>
                        <Menu.Item key="thirdAccountBinding" icon={<LinkOutlined/>}>
                            第三方账号绑定
                        </Menu.Item>
                        <Menu.Item key="apiAccessToken" icon={<KeyOutlined />}>
                            API访问令牌
                        </Menu.Item>
                    </Menu.ItemGroup>
                </Menu>

                <div style={{ flex: 1, paddingLeft: 16 }}>{content[activeTab]}</div>
            </div>
        </Modal>


    );
};
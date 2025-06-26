import React, {useEffect, useState} from 'react';
import { EditModal } from '@/app/(main)/components/Header/EditModal';
import { AccountSettingsModal } from '@/app/(main)/components/Header/AccountSettingsModal';
import { BasicSettings } from '@/app/(main)/components/Header/BasicSettings';
import {ThirdAccountBinding} from "@/app/(main)/components/Header/ThirdAccountBinding";
import {Avatar, Button, Dropdown, Form, Menu, MenuProps, message, Space, Spin, Tooltip} from "antd";
import use_auth_store from "@/stores/auth";
import {
    AppstoreOutlined,
    BellOutlined,
    GithubOutlined, GitlabOutlined,
    HomeOutlined,
    LoadingOutlined,
    ReloadOutlined,
    SettingOutlined, UserOutlined
} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import {SettingsModal} from "@/app/(main)/components/Header/SettingsModal";
import {Appearance} from "@/app/(main)/components/Header/Appearance";
import {General} from "@/app/(main)/components/Header/General";
import {Certificates} from "@/app/(main)/components/Header/Certificates";
import {ROUTES} from "@/utils/routes";

const headerStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    marginRight: '1%',
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: '1%'
};
const fieldRules: Record<string, any[]> = {
    username: [{ required: true, message: '请输入用户名' }],
    email: [
        { required: true, message: '请输入邮箱' },
        { type: 'email', message: '请输入有效的邮箱地址' }
    ],
    phone: [
        { required: true, message: '请输入手机号' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
    ]
};

const iconStyle = {
    fontSize: '12px',
    cursor: 'pointer',
    color: '#727070',
};

const HeaderPage = () => {
    const [loading, setLoading] = useState(false);
    const [accountModalState, setAccountModalState] = useState({ visible: false, tab: 'basicSettings' });
    const [settingModalState, setSettingModalState] = useState({ visible: false, tab: 'appearance' });
    const router = useRouter();
    const [editModal, setEditModal] = useState({
        visible: false,
        field: '',
        label: '',
        value: '',
        rules: [] as any[]
    });
    const [form] = Form.useForm();;
    const { logout, current_user, update_user } = use_auth_store()
    const openEditModal = (field: string, label: string, value: any, rules: any[] = []) => {
        setEditModal({
            visible: true,
            field,
            label,
            value: value || '',
            rules
        });
    };
    const handleEditSave = async () => {
        try {
            await form.validateFields();
            const { field, value } = editModal;
            update_user({ [field]: value });
            setEditModal({ ...editModal, visible: false });
            message.success('修改成功');
        } catch (error) {
            console.error('表单验证失败:', error);
        }
    };
    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };
    const returnToProject = () => {
        router.back();
    };
    const handleLogout = () => {
        setAccountModalState({ ...accountModalState, visible: false })
        try {
            logout()
            message.success('退出登录成功')
            router.push(ROUTES.LOGIN)
        } catch (e) {
            message.error("退出登录失败",e)
        }
    }

    const handleAccountMenuClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case 'logout':
                handleLogout();
                break;
            case 'accountSettings':
                setAccountModalState({ ...accountModalState, visible: true });
                break;
            default:
                break;
        }
    };

    const accountMenu: {
        onClick: any;
        items: ({ icon: React.JSX.Element; label: string; key: string })[]
    } = {
        items: [
            {
                key: 'accountSettings',
                icon: <SettingOutlined />,
                label: '账号设置',
            },
            {
                key: 'logout',
                icon: <UserOutlined />,
                label: '退出登录',
            },
        ],
        onClick: handleAccountMenuClick,
    };

    const handleCodeRepoClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case 'github':
                window.open('https://github.com/qianjisantech/easypost', '_blank');
                break;
            case 'gitee':
                window.open('https://gitee.com/xiaoyuanyuan-rush_admin/easypost', '_blank');
                break;
            default:
                message.info(`已选择 ${key}`);
        }
    };

    const codeRepositoryMenu: {
        onClick: any;
        items: ({ icon: React.JSX.Element; label: string; key: string })[]
    } = {
        items: [
            {
                key: 'github',
                icon: <GithubOutlined />,
                label: 'GitHub 项目地址',
            },
            {
                key: 'gitee',
                icon: <GitlabOutlined />,
                label: 'Gitee 项目地址',
            },
        ],
        onClick: handleCodeRepoClick,
    };

    const handleSettingsMenuClick =()=>{
        setSettingModalState({ ...settingModalState, visible: true });
    }
    const handleEditCancel = () => {
        form.resetFields(); // 重置表单字段
        setEditModal({
            visible: false,
            field: '',
            label: '',
            value: '',
            rules: []
        });
    };

    const accountContent = {
        basicSettings: (
            <BasicSettings
                currentUser={current_user}
                onEdit={openEditModal}
                fieldRules={fieldRules}
            />
        ),
        thirdAccountBinding: (
            <ThirdAccountBinding />
        ),
    };

    const settingsContent = {
        appearance: (
            <Appearance></Appearance>
        ),
        general:(
            <General></General>
        ),
        certificates:(
            <Certificates></Certificates>
        )
    };

    return (
        <div style={headerStyle}>
            <Button
                ghost
                size={'small'}
                style={{ color: '#666', borderColor: '#f0f0f0', left: 20 }}
                type="default"
                onClick={returnToProject}
            >
                <HomeOutlined /> Home
            </Button>
            <Space size="middle" style={{ position: 'absolute', right: 10 }}>
                <Dropdown menu={codeRepositoryMenu} trigger={['hover']}>
                    <GithubOutlined style={iconStyle} />
                </Dropdown>
                <Tooltip title="刷新">
                    {loading ? (
                        <Spin indicator={<LoadingOutlined spin style={iconStyle} />} />
                    ) : (
                        <ReloadOutlined style={iconStyle} onClick={handleRefresh} />
                    )}
                </Tooltip>

                <Tooltip title="设置">
                    <SettingOutlined onClick={handleSettingsMenuClick} style={iconStyle} />
                </Tooltip>
                <Tooltip title="通知">
                    <BellOutlined style={iconStyle} />
                </Tooltip>

                <Dropdown menu={accountMenu} trigger={['hover']}>
                    <Avatar icon={<UserOutlined />} size={'small'} style={{ cursor: 'pointer' }} />
                </Dropdown>
            </Space>

            <EditModal
                visible={editModal.visible}
                label={editModal.label}
                value={editModal.value}
                rules={editModal.rules}
                onCancel={handleEditCancel}
                onOk={handleEditSave}
                onChange={(value) => setEditModal({ ...editModal, value })}
                form={form}
            />

            <AccountSettingsModal
                visible={accountModalState.visible}
                currentUser={current_user}
                onCancel={() => setAccountModalState({ ...accountModalState, visible: false })}
                onMenuClick={(e) => setAccountModalState({ ...accountModalState, tab: e.key })}
                activeTab={accountModalState.tab}
                content={accountContent}
                onEdit={openEditModal}
                fieldRules={fieldRules}
            />
            <SettingsModal
                visible={settingModalState.visible}
                currentUser={current_user}
                onCancel={() => setSettingModalState({ ...settingModalState, visible: false })}
                onMenuClick={(e) => setSettingModalState({ ...settingModalState, tab: e.key })}
                activeTab={settingModalState.tab}
                content={settingsContent}
                onEdit={openEditModal}
                fieldRules={fieldRules}
            />
        </div>
    );
};

export default HeaderPage;
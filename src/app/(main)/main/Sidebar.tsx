import React, {CSSProperties, forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {useRouter} from 'next/navigation';
import {
    DashboardOutlined,
    HistoryOutlined,
    PlusOutlined, ShopOutlined,
    StarOutlined,
    TeamOutlined
} from '@ant-design/icons';
import {Button, Input, Menu, message, Modal, Tag, Typography} from 'antd';
import TeamAPI from '@/api/team';
import {useGlobalContext} from '@/contexts/global';
import {ROUTES} from '@/utils/routes';

const {Title} = Typography;

const sidebarStyle: CSSProperties = {
    width: '300px',
    height: '100vh', // 使用视口高度而不是100%
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRight: '1px solid #ddd',
    flexShrink: 0,
    position: 'relative' // 添加相对定位
};

const logoStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center', // 垂直居中
    justifyContent: 'center', // 水平居中
    gap: '8px', // 图标和文字间距
    margin: '20px 0', // 调整上下边距
};

const Sidebar = forwardRef((props, ref) => {
    const router = useRouter();
    const [name, setName] = useState('');  //团队名称
    const [modalVisible, setModalVisible] = useState(false);
    const { teams, fetchTeams} = useGlobalContext();
    const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchTeams();
        };
        fetchData();
    }, []);

    useImperativeHandle(ref, () => ({
        handleMenuItemClick,
    }));

    const handleCreateTeamClick = () => {
        setModalVisible(true);
    };

    const handleCreateTeam = async () => {
        if (!name.trim()) {
            message.error('团队名称不能为空');
            return;
        }
        try {
            const res = await TeamAPI.create({name: name});
            if (res.data.success) {
                message.success(res.data.message);
                setName('');
                setModalVisible(false);
                await fetchTeams().then(() => {
                    handleMenuItemClick(res.data.data.id);
                });
            }
        } catch (error) {
            message.error('创建团队失败');
        }
    };

    const handleMenuItemClick = (teamId) => {
        setDefaultOpenKeys(teamId);
        router.push(ROUTES.TEAMS(teamId));
    };

    return (
        <div style={sidebarStyle}>
            {/* Logo 部分 - 已优化对齐 */}
            <div style={logoStyle}>
                <svg
                    className="icon"
                    height="32" // 减小尺寸
                    width="32" // 减小尺寸
                    viewBox="0 0 1028 1024"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M585.473374 295.885775l-240.51966 65.974206 48.843004 180.976182 240.583927-65.974205 49.067938 180.815514-240.583927 63.854395 46.81859 180.976182-240.583927 63.841341-59.672012-216.962752a178.104246 178.104246 0 0 0 36.250667-159.735902c-17.062918-57.48693-59.639878-102.184705-110.700097-121.336304L55.330969 244.793423l483.288669-127.795149z m304.433301-8.483258L811.147331 0 0.001004 215.005617l78.75834 289.555465c46.81859 8.579659 89.427684 44.697775 102.184705 95.790128 14.90997 51.124486-4.273763 102.184705-40.456146 136.246273l76.606395 287.402517 811.180469-217.126432-76.7038-287.402516c-48.939404-8.579659-89.363417-44.697775-104.273386-95.790128-12.753005-51.124486 4.273763-104.333637 42.57696-136.246274z"
                        fill="#FF7300"
                    />
                </svg>
                <Title level={4} style={{margin: 0}}>EasyPost</Title> {/* 减小标题级别并移除边距 */}
            </div>

            {/* 优化后的Menu */}
            <Menu
                defaultOpenKeys={['teams']}
                mode="inline"
                style={{
                    flex: 1,
                    borderRight: 0,
                    overflowY: 'auto',
                    padding: '8px 0',
                    marginBottom: '80px'
                }}
                theme="light"
            >
                {/* 团队分组 */}
                <Menu.SubMenu
                    key="teams"
                    icon={<TeamOutlined />}
                    title="我的团队"
                    popupClassName="team-submenu"
                >
                    <Menu.Item
                        key="create-team"
                        icon={<PlusOutlined />}
                        onClick={handleCreateTeamClick}
                        style={{
                            margin: '4px 0',
                            borderRadius: '6px',
                            marginLeft: '24px',
                            width: 'calc(100% - 24px)',
                            color: 'rgb(47,124,206)'
                        }}
                    >
                        新建团队
                    </Menu.Item>

                    {teams.length > 0 && teams.map((team) => (
                        <Menu.Item
                            key={`team-${team.id}`}
                            style={{
                                margin: '4px 0',
                                borderRadius: '6px',
                                marginLeft: '24px',
                                width: 'calc(100% - 24px)'
                            }}
                            onClick={() => handleMenuItemClick(team.id)}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <span>{team.name}</span>
                            </div>
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>

                {/* 其他菜单项 */}
                <Menu.Item
                    key="market"
                    icon={<ShopOutlined />}
                    style={{margin: '8px 0', borderRadius: '6px'}}
                >
                    资源市场
                </Menu.Item>
                <Menu.Item
                    key="board"
                    icon={<DashboardOutlined />}
                    style={{margin: '8px 0', borderRadius: '6px'}}
                    onClick={() =>  router.push(ROUTES.COLLABORATIONDASHBOARD)}
                >
                    协作看板
                </Menu.Item>
                <Menu.Item
                    key="favorites"
                    icon={<StarOutlined />}
                    style={{margin: '8px 0', borderRadius: '6px'}}

                >
                    我的收藏
                </Menu.Item>
                <Menu.Item
                    key="recent"
                    icon={<HistoryOutlined />}
                    style={{margin: '8px 0', borderRadius: '6px'}}
                >
                    最近访问
                </Menu.Item>
            </Menu>


            <div style={{
                padding: '16px',
                borderTop: '1px solid #f0f0f0',
                backgroundColor: '#fff',
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '280px',
                zIndex: 1
            }}>
                <Button
                    type="text"
                    block
                    icon={<TeamOutlined/>} // 添加组织图标
                    style={{
                        color: '#111213',
                        textAlign: 'center', // 文字居中
                        height: '40px',
                        border: '1px solid #f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', // 内容居中
                        borderRadius: '8px', // 添加圆角
                        padding: '0 16px',
                        ':hover': {
                            backgroundColor: '#e9ecef' // 悬停效果
                        }
                    }}
                >
                    组织
                </Button>
            </div>
            <Modal
                cancelText="取消"
                okText="新建"
                open={modalVisible}
                title="新建团队"
                width={400}
                onCancel={() => {
                    setModalVisible(false)
                }}
                onOk={handleCreateTeam}
            >
                <Input
                    placeholder="请输入团队名称"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </Modal>
        </div>
    );
});

Sidebar.displayName = 'Sidebar'; // 添加displayName

export default Sidebar;
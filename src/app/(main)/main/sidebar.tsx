import React, {CSSProperties, forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {useRouter} from 'next/navigation';
import {
    DashboardOutlined, DownloadOutlined,
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
    width: '100%',
    height: '94vh',
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

export  const MainSideBar = forwardRef((props, ref) => {
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
                // await fetchTeams().then(() => {
                //     handleMenuItemClick(res.data.data.id);
                // });
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

            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                }}>
                {/* 优化后的Menu */}
                <Menu
                    width={200}
                    defaultOpenKeys={['teams']}
                    mode="inline"
                    style={{
                        flex: 1,
                        borderRight: 0,
                        overflowY: 'auto',
                        marginBottom: '80px'
                    }}
                    theme="light"
                >
                    {/* 团队分组 */}
                    <Menu.SubMenu
                        key="teams"
                        icon={<TeamOutlined/>}
                        title="我的团队"
                        style={{
                            margin: '4px 0',
                            borderRadius: '6px',
                            marginLeft: '5%',
                            marginRight: '5%',
                            width: '90%',
                            backgroundColor: 'transparent !important',
                        }}
                        popupClassName="team-submenu"
                    >


                        {teams.length > 0 && teams.map((team) => (
                            <Menu.Item
                                key={`team-${team.id}`}
                                style={{
                                    margin: '4px 0',
                                    borderRadius: '6px',
                                    marginLeft: '5%',
                                    marginRight: '5%',
                                    width: '90%',
                                    backgroundColor: 'transparent !important',
                                }}
                                onClick={() => handleMenuItemClick(team.id)}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: 'transparent !important',
                                }}>
                                    <span>{team.name}</span>
                                </div>
                            </Menu.Item>
                        ))}
                        <Menu.Item
                            key="create-team"
                            icon={<PlusOutlined/>}
                            onClick={handleCreateTeamClick}
                            style={{
                                margin: '4px 0',
                                borderRadius: '6px',
                                marginLeft: '5%',
                                marginRight: '5%',
                                width: '90%',
                                color: 'rgb(47,124,206)',
                                backgroundColor: 'transparent !important',
                            }}
                        >
                            新建团队
                        </Menu.Item>
                    </Menu.SubMenu>

                    {/* 其他菜单项 */}
                    <Menu.Item
                        key="market"
                        icon={<ShopOutlined/>}
                        style={{
                            margin: '4px 0',
                            borderRadius: '6px',
                            marginLeft: '5%',
                            marginRight: '5%',
                            width: '90%',
                        }}
                        onClick={() => router.push(ROUTES.RESOURCEMARKET)}
                    >
                        资源市场
                    </Menu.Item>
                    <Menu.Item
                        key="board"
                        icon={<DashboardOutlined/>}
                        style={{
                            margin: '4px 0',
                            borderRadius: '6px',
                            marginLeft: '5%',
                            marginRight: '5%',
                            width: '90%',
                        }}
                        onClick={() => router.push(ROUTES.COLLABORATIONDASHBOARD)}
                    >
                        协作看板
                    </Menu.Item>
                    <Menu.Item
                        key="favorites"
                        icon={<StarOutlined/>}
                        style={{
                            margin: '4px 0',
                            borderRadius: '6px',
                            marginLeft: '5%',
                            marginRight: '5%',
                            width: '90%',
                        }}
                        onClick={() => router.push(ROUTES.MYCOLLECTION)}

                    >
                        我的收藏
                    </Menu.Item>
                    <Menu.Item
                        key="recent"
                        icon={<HistoryOutlined/>}
                        style={{
                            margin: '4px 0',
                            borderRadius: '6px',
                            marginLeft: '5%',
                            marginRight: '5%',
                            width: '90%',
                        }}
                        onClick={() => router.push(ROUTES.RECENTLYVISITED)}
                    >
                        最近访问
                    </Menu.Item>


                </Menu>
            </div>

            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0 10% 10% 10%', // 底部padding增加到20%
                backgroundColor: '#fff',
                borderTop: '1px solid #f0f0f0'
            }}>
                {/* 组织按钮 */}
                <Button
                    type="text"
                    block
                    icon={<TeamOutlined/>}
                    style={{
                        color: '#111213',
                        height: '40px',
                        border: '1.5px solid #f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        margin: '10px 0',
                        ':hover': {
                            backgroundColor: '#e9ecef'
                        }
                    }}
                >
                    组织
                </Button>

                {/* 下载桌面端按钮 */}
                <Button
                    type="text"
                    block
                    icon={<DownloadOutlined/>}
                    style={{
                        color: '#fbfcfb',
                        height: '40px',
                        backgroundColor:'rgb(147, 115, 238)',
                        border: '1.5px solid #f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        fontSize:'16px',
                        ':hover': {
                            backgroundColor: '#e9ecef'
                        }
                    }}
                >
                    下载桌面端
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
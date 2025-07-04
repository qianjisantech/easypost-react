import React, { CSSProperties, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DashboardOutlined,
  DownloadOutlined,
  HistoryOutlined,
  PlusOutlined,
  ShopOutlined,
  StarOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { Button, Input, Menu, Modal, Typography } from 'antd';
import { ROUTES } from '@/utils/routes';

const { Title } = Typography;

interface SidebarProps {
  teams: Array<{ id: string; name: string }>;
  fetchTeams: () => void;
  defaultOpenKeys?: string[];
}

const sidebarStyle: CSSProperties = {
  width: '100%',
  height: '94vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  borderRight: '1px solid #ddd',
  flexShrink: 0,
  position: 'relative'
};

const logoStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  margin: '20px 0',
};

export const OrganizationMenu: React.FC<SidebarProps> = ({
                                                   teams,
                                                   fetchTeams,
                                                   defaultOpenKeys = []
                                                 }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleMenuItemClick = (teamId: string) => {
    router.push(ROUTES.TEAMS(teamId));
  };

  const handleCreateTeamClick = () => {
    setModalVisible(true);
  };

  const handleCreateTeam = async () => {
    if (!name.trim()) return;

    try {
      // 这里应该是调用API创建团队
      // const res = await TeamAPI.create({ name });
      // if (res.data.success) {
      //   fetchTeams();
      //   handleMenuItemClick(res.data.data.id);
      // }
      setModalVisible(false);
      setName('');
    } catch (error) {
      console.error('创建团队失败', error);
    }
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo 部分 */}
      <div style={logoStyle}>
        <svg
          className="icon"
          height="32"
          width="32"
          viewBox="0 0 1028 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M585.473374 295.885775l-240.51966 65.974206 48.843004 180.976182 240.583927-65.974205 49.067938 180.815514-240.583927 63.854395 46.81859 180.976182-240.583927 63.841341-59.672012-216.962752a178.104246 178.104246 0 0 0 36.250667-159.735902c-17.062918-57.48693-59.639878-102.184705-110.700097-121.336304L55.330969 244.793423l483.288669-127.795149z m304.433301-8.483258L811.147331 0 0.001004 215.005617l78.75834 289.555465c46.81859 8.579659 89.427684 44.697775 102.184705 95.790128 14.90997 51.124486-4.273763 102.184705-40.456146 136.246273l76.606395 287.402517 811.180469-217.126432-76.7038-287.402516c-48.939404-8.579659-89.363417-44.697775-104.273386-95.790128-12.753005-51.124486 4.273763-104.333637 42.57696-136.246274z"
            fill="#FF7300"
          />
        </svg>
        <Title level={4} style={{ margin: 0 }}>EasyPost</Title>
      </div>

      {/* 菜单部分 */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Menu
          defaultSelectedKeys={defaultOpenKeys}
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
            icon={<TeamOutlined />}
            title="我的团队"
            style={{
              margin: '4px 0',
              borderRadius: '6px',
              marginLeft: '5%',
              marginRight: '5%',
              width: '90%',
            }}
          >
            {teams.map((team) => (
              <Menu.Item
                key={`team-${team.id}`}
                style={{
                  margin: '4px 0',
                  borderRadius: '6px',
                  marginLeft: '5%',
                  marginRight: '5%',
                  width: '90%',
                }}
                onClick={() => handleMenuItemClick(team.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{team.name}</span>
                </div>
              </Menu.Item>
            ))}
            <Menu.Item
              key="create-team"
              icon={<PlusOutlined />}
              onClick={handleCreateTeamClick}
              style={{
                margin: '4px 0',
                borderRadius: '6px',
                marginLeft: '5%',
                marginRight: '5%',
                width: '90%',
                color: 'rgb(47,124,206)',
              }}
            >
              新建团队
            </Menu.Item>
          </Menu.SubMenu>

          {/* 其他菜单项 */}
          {[
            { key: 'market', icon: <ShopOutlined />, label: '资源市场', route: ROUTES.RESOURCEMARKET },
            { key: 'board', icon: <DashboardOutlined />, label: '协作看板', route: ROUTES.COLLABORATIONDASHBOARD },
            { key: 'favorites', icon: <StarOutlined />, label: '我的收藏', route: ROUTES.MYCOLLECTION },
            { key: 'recent', icon: <HistoryOutlined />, label: '最近访问', route: ROUTES.RECENTLYVISITED },
          ].map((item) => (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              style={{
                margin: '4px 0',
                borderRadius: '6px',
                marginLeft: '5%',
                marginRight: '5%',
                width: '90%',
              }}
              onClick={() => router.push(item.route)}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </div>

      {/* 底部按钮 */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '0 10% 10% 10%',
        backgroundColor: '#fff',
        borderTop: '1px solid #f0f0f0'
      }}>
        <Button
          type="text"
          block
          icon={<TeamOutlined />}
          style={{
            height: '40px',
            border: '1.5px solid #f0f0f0',
            borderRadius: '8px',
            margin: '10px 0',
          }}
        >
          组织
        </Button>

        <Button
          type="text"
          block
          icon={<DownloadOutlined />}
          style={{
            color: '#fff',
            height: '40px',
            backgroundColor: 'rgb(147, 115, 238)',
            border: '1.5px solid #f0f0f0',
            borderRadius: '8px',
            fontSize: '16px',
          }}
        >
          下载桌面端
        </Button>
      </div>

      {/* 新建团队弹窗 */}
      <Modal
        title="新建团队"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleCreateTeam}
        cancelText="取消"
        okText="新建"
        width={400}
      >
        <Input
          placeholder="请输入团队名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
    </div>
  );
};
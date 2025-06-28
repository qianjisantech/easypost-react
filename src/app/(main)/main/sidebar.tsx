import React, { CSSProperties, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { message, Typography } from 'antd';
import TeamAPI from '@/api/team';
import { useGlobalContext } from '@/contexts/global';
import { ROUTES } from '@/utils/routes';
import { MainMenu } from '@/app/(main)/main/components/MainMenu';
import { OrganizationMenu } from '@/app/(main)/main/components/OrganizationMenu';

const { Title } = Typography;

export const MainSideBar = forwardRef((props, ref) => {
  const router = useRouter();
  const param = useParams();
  const [name, setName] = useState('');  //团队名称
  const [modalVisible, setModalVisible] = useState(false);
  const { teams, fetchTeams } = useGlobalContext();
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
  const { setGlobalLoading } = useGlobalContext();
  useEffect(() => {
    setGlobalLoading(true);
    const fetchData = async () => {
      await fetchTeams();
    };
    fetchData();
    console.log('param', param);

    if (param) {
      setDefaultOpenKeys([`${param}`]);
    }
    setGlobalLoading(false);
  }, [param]);
  ;

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
      const res = await TeamAPI.create({ name: name });
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
    <>
      <MainMenu
        teams={teams}
        fetchTeams={fetchTeams}
        defaultOpenKeys={['teams']}
      />
      <OrganizationMenu
        teams={teams}
        fetchTeams={fetchTeams}
       defaultOpenKeys={['teams']}></OrganizationMenu>

    </>
  );
});
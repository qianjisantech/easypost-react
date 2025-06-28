'use client'

import React from 'react';
import { Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { CSSProperties } from 'react';

const { Title, Text } = Typography;

const Organizations = () => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '100vh',
    width: '100%'
  };

  const iconStyle: CSSProperties = {
    fontSize: '48px',
    color: '#a9a9b2',
  };

  return (
    <div style={containerStyle}>
      <TeamOutlined style={iconStyle} />
      <Title level={3} style={{ marginBottom: 16 }}>
        尚未加入组织内的任何团队
      </Title>
      <Text type="secondary">
        你已经成功加入组织，请联系组织所有者将你分配到一个团队
      </Text>
    </div>
  );
};

export default Organizations;
import { Descriptions, Button } from 'antd';
import React from 'react';

interface BasicSettingsProps {
    currentUser: any;
    onEdit: (field: string, label: string, value: any, rules?: any[]) => void;
    fieldRules: Record<string, any[]>;
}

export const BasicSettings: React.FC<BasicSettingsProps> = ({
                                                                currentUser,
                                                                onEdit,
                                                                fieldRules,
                                                            }) => {
    return (

        <>
            <h2 style={{ marginBottom: 16 }}>基本设置</h2>
            <Descriptions column={1} bordered title={'账号信息'}>
                <Descriptions.Item
                    label="用户名"
                >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>{currentUser?.username || ''}</span>
                        <Button
                            type="default"
                            size="middle"
                            onClick={() => onEdit(
                                'username',
                                '用户名',
                                currentUser?.username,
                                fieldRules.username
                            )}
                        >
                            修改
                        </Button>
                    </div>
                </Descriptions.Item>
                <Descriptions.Item
                    label="邮箱"
                >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>{currentUser?.email || ''}</span>
                        <Button
                            type="default"
                            size="middle"
                            onClick={() => onEdit(
                                'email',
                                '邮箱',
                                currentUser?.email,
                                fieldRules.email
                            )}
                        >
                            修改
                        </Button>
                    </div>
                </Descriptions.Item>
                <Descriptions.Item
                    label="手机号"
                >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>{currentUser?.phone || ''}</span>
                        <Button
                            type="default"
                            size="middle"
                            onClick={() => onEdit(
                                'phone',
                                '手机号',
                                currentUser?.phone,
                                fieldRules.phone
                            )}
                        >
                            修改
                        </Button>
                    </div>
                </Descriptions.Item>
            </Descriptions>
            <Descriptions style={{marginTop: 16}} column={1} bordered title={'用户体验改进'}>
                <Descriptions.Item
                    label="角色"
                >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>{'暂无角色'}</span>
                        <Button
                            type="default"
                            size="middle"
                            onClick={() => onEdit(
                                'username',
                                '用户名',
                                currentUser?.username,
                                fieldRules.username
                            )}
                        >
                            绑定角色
                        </Button>
                    </div>
                </Descriptions.Item>
                <Descriptions.Item
                    label="开发模式"
                >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        {/*<span>{current_user?.email || '未设置'}</span>*/}
                        <span>未设置</span>
                        <Button
                            type="default"
                            size="middle"
                            onClick={() => onEdit(
                                'email',
                                '邮箱',
                                currentUser?.email,
                                fieldRules.email
                            )}
                        >
                            修改
                        </Button>
                    </div>
                </Descriptions.Item>
            </Descriptions>
            <Descriptions style={{marginTop: 16}} column={1} bordered title={'危险区域'}>
                <Descriptions.Item
                    label="注销账号"
                >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>务必谨慎，注销后账号将永久删除</span>
                        <Button
                            danger
                            type="default"
                            size="middle"
                            onClick={() => onEdit(
                                'username',
                                '用户名',
                                currentUser?.username,
                                fieldRules.username
                            )}
                        >
                            注销
                        </Button>
                    </div>
                </Descriptions.Item>

            </Descriptions>
        </>
    );
};
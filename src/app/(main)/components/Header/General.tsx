import { Form, Input, Switch, Card, Select } from 'antd';
import React from 'react';

interface GeneralProps {
}

export const General: React.FC<GeneralProps> = () => {
    return (
        <Card title="通用设置" bordered={false}>
            <Form layout="vertical">
                <Form.Item label="语言">
                    <Select
                        defaultValue={ 'zh-CN'}
                        // onChange={(value) => onEdit('language', '语言', value)}
                    >
                        <Select.Option value="zh-CN">简体中文</Select.Option>
                        <Select.Option value="en-US">English</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="时区">
                    <Select
                        defaultValue={ 'Asia/Shanghai'}
                        // onChange={(value) => onEdit('timezone', '时区', value)}
                    >
                        <Select.Option value="Asia/Shanghai">上海 (UTC+8)</Select.Option>
                        <Select.Option value="America/New_York">纽约 (UTC-5)</Select.Option>
                        <Select.Option value="Europe/London">伦敦 (UTC+0)</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="启用通知">
                    <Switch
                        checked={ true}
                        // onChange={(checked) => onEdit('notificationsEnabled', '启用通知', checked)}
                    />
                </Form.Item>

                <Form.Item label="自动保存">
                    <Switch
                        checked={ true}
                        // onChange={(checked) => onEdit('autoSave', '自动保存', checked)}
                    />
                </Form.Item>

                <Form.Item label="自动保存间隔(分钟)">
                    <Input
                        type="number"
                        min={1}
                        max={60}
                        defaultValue={ 5}
                        // onChange={(e) => onEdit('autoSaveInterval', '自动保存间隔', e.target.value)}
                    />
                </Form.Item>
            </Form>
        </Card>
    );
};
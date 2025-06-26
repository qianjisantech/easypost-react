import { Form, Input, Select, Switch, Card } from 'antd';
import React from 'react';

interface AppearanceProps {
}

export const Appearance: React.FC<AppearanceProps> = () => {
    return (
        <Card title="外观设置" bordered={false}>
            <Form layout="vertical">
                <Form.Item label="主题颜色">
                    <Select
                        defaultValue={ 'light'}
                        // onChange={(value) => onEdit('theme', '主题颜色', value)}
                    >
                        <Select.Option value="light">浅色</Select.Option>
                        <Select.Option value="dark">深色</Select.Option>
                        <Select.Option value="system">跟随系统</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="主色调">
                    <Input
                        type="color"
                        defaultValue={ '#1890ff'}
                        // onChange={(e) => onEdit('primaryColor', '主色调', e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="紧凑布局">
                    <Switch
                        checked={ false}
                        // onChange={(checked) => onEdit('compactMode', '紧凑布局', checked)}
                    />
                </Form.Item>

                <Form.Item label="字体大小">
                    <Select
                        defaultValue={ 'normal'}
                        // onChange={(value) => onEdit('fontSize', '字体大小', value)}
                    >
                        <Select.Option value="small">小</Select.Option>
                        <Select.Option value="normal">正常</Select.Option>
                        <Select.Option value="large">大</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Card>
    );
};
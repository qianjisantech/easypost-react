import { Descriptions, Button } from 'antd';
import React from 'react';

interface ThirdAccountBindingProps {
}

export const ThirdAccountBinding: React.FC<ThirdAccountBindingProps> = () => {
    return (
        <div>
            <Descriptions style={{marginTop: 16}} column={1} bordered title={'第三方账号绑定'}>
                <Descriptions.Item
                >
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span>绑定飞书后，您可通过飞书扫码登录EasyPost</span>
                    </div>
                </Descriptions.Item>

            </Descriptions>
        </div>
    );
};
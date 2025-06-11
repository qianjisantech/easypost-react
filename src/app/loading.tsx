
import { Spin } from 'antd';

export default function GlobalLoading() {
    console.log('触发loading')
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999
        }}>
            <Spin size="large" tip="加载中..." />
        </div>
    );
}
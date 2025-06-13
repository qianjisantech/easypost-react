// app/error.tsx
'use client'
import { Button, Result } from 'antd'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Result
                status="error"
                title="加载失败"
                subTitle={error.message}
                extra={<Button onClick={reset}>重试</Button>}
            />
        </div>
    )
}
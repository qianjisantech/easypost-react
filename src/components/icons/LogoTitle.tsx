import React from 'react'
import { Typography } from 'antd'
import LogoIcon from './LogoIcon'

const { Title } = Typography

interface LogoTitleProps {
    title?: string
    iconSize?: number
    titleLevel?: 1 | 2 | 3 | 4 | 5
    className?: string
}

const LogoTitle = ({
                       title = "EasyPost",
                       iconSize = 64,
                       titleLevel = 2,
                       className = ''
                   }: LogoTitleProps) => (
    <div className={`logo-title ${className}`} style={{ display: 'flex', alignItems: 'center' }}>
        <LogoIcon size={iconSize} />
        <Title level={titleLevel} style={{ marginLeft: 10, marginBottom: 0 }}>
            {title}
        </Title>
    </div>
)

export default LogoTitle
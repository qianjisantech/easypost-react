'use client'
import type React from 'react'

import {Button, message} from 'antd'

interface SwitchLoginMethodButtonProps {
  isQRCodeLogin: boolean
  setIsQRCodeLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const SwitchLoginMethodButton: React.FC<SwitchLoginMethodButtonProps> = ({
  isQRCodeLogin,
  setIsQRCodeLogin,
}) => {
  const handleClick = () => {
    if (!isQRCodeLogin) {
      message.error('当前功能待开发')
    }
    // setIsQRCodeLogin(!isQRCodeLogin)
  }
  return (
    <Button
      ghost
      style={{
        width: '100%',
        borderColor: '#D6A5D6',
        color: '#D6A5D6',
        borderRadius: '4px',
      }}
      onClick={handleClick} // 切换登录方式
    >
      {isQRCodeLogin ? '邮箱登录' : '飞书登录'}
    </Button>
  )
}

export default SwitchLoginMethodButton

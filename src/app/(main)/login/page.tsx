'use client'

import React, { useState } from 'react'
import { Card, Typography } from 'antd'
import EmailLogin from '@/app/(main)/login/components/EmailLogin'
import QRCodeLogin from '@/app/(main)/login/components/QRCodeLogin'
import SwitchLoginMethodButton from '@/app/(main)/login/components/SwitchLoginMethodButton'
import LogoIcon from "@/components/icons/LogoIcon";

const { Title } = Typography

const LoginPage = () => {
  const [isQRCodeLogin, setIsQRCodeLogin] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        position: 'relative',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.1))',
        overflow: 'hidden',
          gap: '100px'
      }}
    >
      {/* 左上角的SVG */}
      <div
        style={{ position: 'absolute', top: 40, left: 30, display: 'flex', alignItems: 'center' }}
      >
          <LogoIcon size={50} color="#FF7300" />
          <Title level={2} style={{ fontSize:'25px',color:'rgb(52, 64, 84)',display: 'flex', alignItems: 'center',marginLeft:10,alignContent:'center' }}>
          EasyPost
        </Title>
      </div>
        {/*卡片展示二维码或邮箱登录信息*/}
         <div>
             <Card
                 hoverable
                 style={{
                     width: '100%',
                     height: '100%',
                     maxWidth: 375,
                     minWidth:400,
                     maxHeight:600,
                     minHeight: 500,
                     textAlign: 'center',
                     padding: '20px',
                     boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                     borderRadius: '10px',
                     transition: 'box-shadow 0.3s ease',
                 }}
             >
                 <Title  style={ {color:'rgba(16, 24, 40, 0.8)',
                     fontSize:'23px',
                     marginBottom:50,
                     fontStyle:'-apple-system, BlinkMacSystemFont, "Segoe UI", roboto, "Helvetica Neue", arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'}} level={2}>
                     欢迎使用EasyPost</Title>

                 {isQRCodeLogin ? <QRCodeLogin /> : <EmailLogin />}

                 {/* 切换登录方式按钮 */}
                 <SwitchLoginMethodButton
                     isQRCodeLogin={isQRCodeLogin}
                     setIsQRCodeLogin={setIsQRCodeLogin}
                 />
             </Card>

             <div
                 style={{
                     position: 'fixed',
                     marginTop: '50px',
                     left: 0,
                     right: 0,
                     textAlign: 'center',
                     color: 'rgba(16, 24, 40, 0.8)',
                     padding: '20px 0',
                     zIndex: 1000, // 确保在其他内容之上
                 }}
             >
                 Copyright @ 2024-2025 EasyPost
             </div>
         </div>
    </div>
  )
}

export default LoginPage

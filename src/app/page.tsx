'use client'
import React, { useEffect, useState } from 'react'
import { Typography, Button, Tabs } from 'antd';
import HomePage from '@/app/components/OfficialWebsite/home';
import DocumentPage from '@/app/components/OfficialWebsite/document';

export default function OfficialWebsitePage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 定义标签项
  const tabItems = [
    {
      key: 'home',
      label: '首页',
      children: <div style={{marginTop: '10%',width:'100%'}}>
        <HomePage />
      </div>
    },
    {
      key: 'docs',
      label: '帮助文档',
      children: <div style={{marginTop: '2%',width:'100%'}}><DocumentPage /></div>
    },
    // {
    //   key: 'help',
    //   label: '帮助',
    //   children: (
    //     <div className="py-10">
    //       <h2 className="text-3xl font-bold text-center mb-8">帮助页面</h2>
    //       <p className="text-lg text-gray-600 text-center">
    //         这里是帮助页面内容，正在开发中...
    //       </p>
    //     </div>
    //   )
    // },
    // {
    //   key: 'about',
    //   label: '关于',
    //   children: (
    //     <div className="py-10">
    //       <h2 className="text-3xl font-bold text-center mb-8">关于页面</h2>
    //       <p className="text-lg text-gray-600 text-center">
    //         这里是关于页面内容，正在开发中...
    //       </p>
    //     </div>
    //   )
    // }
  ]

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* 固定导航栏 */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white border-gray-200'} px-6 py-3`}>
        <div className="max-w-7xl mx-auto flex items-center">
          {/* 左侧Logo和标题 - 固定宽度 */}
          <div className="flex-shrink-0 flex items-center w-48">
            <svg
              className="icon"
              height="36"
              width="36"
              viewBox="0 0 1028 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M585.473374 295.885775l-240.51966 65.974206 48.843004 180.976182 240.583927-65.974205 49.067938 180.815514-240.583927 63.854395 46.81859 180.976182-240.583927 63.841341-59.672012-216.962752a178.104246 178.104246 0 0 0 36.250667-159.735902c-17.062918-57.48693-59.639878-102.184705-110.700097-121.336304L55.330969 244.793423l483.288669-127.795149z m304.433301-8.483258L811.147331 0 0.001004 215.005617l78.75834 289.555465c46.81859 8.579659 89.427684 44.697775 102.184705 95.790128 14.90997 51.124486-4.273763 102.184705-40.456146 136.246273l76.606395 287.402517 811.180469-217.126432-76.7038-287.402516c-48.939404-8.579659-89.363417-44.697775-104.273386-95.790128-12.753005-51.124486 4.273763-104.333637 42.57696-136.246274z"
                fill="#FF7300"
              />
            </svg>
            <Typography.Title
              level={3}
              style={{
                margin: 0,
                marginLeft: 8,
                color: 'black',
                lineHeight: '1.5',
              }}
            >
              EasyPost
            </Typography.Title>
          </div>

          {/* 居中的Tabs - 使用绝对定位居中 */}
          <div className="flex-1 flex justify-center">
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                tabBarStyle={{ margin: 0 }}
                className="flex items-center"
              />
            </div>
          </div>

          {/* 右侧按钮 - 固定宽度 */}
          <div className="flex-shrink-0 w-48 flex justify-end">
            <Button
              type="primary"
              className="rounded-full shadow-sm"
              style={{
                backgroundColor: 'rgb(128, 102, 255)',
                borderColor: 'rgb(128, 102, 255)',
                color: '#fff',
                height: 40,
                padding: '0 16px',
                borderRadius: '20px',
                borderWidth: 2,
                fontWeight: 500
              }}
              href="/login"
            >
              进入EasyPost
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
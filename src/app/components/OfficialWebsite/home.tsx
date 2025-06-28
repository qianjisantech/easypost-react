'use client'
import { Terminal, Code, ChevronRight, FileText, Cloud, Gauge, TestTube2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Typography, Button, Tabs } from 'antd';

// 卡片组件
function FeatureCard({
                       icon,
                       title,
                       description,
                       color = 'blue'
                     }: {
  icon: React.ReactNode,
  title: string,
  description: string,
  color?: 'blue' | 'green' | 'orange' | 'purple'
}) {
  const colorMap = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    green: { bg: 'bg-green-50', text: 'text-green-600' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600' }
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
      <div className="p-6 h-full flex flex-col">
        <div className={`${colorMap[color].bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
          <div className={`${colorMap[color].text}`}>
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <Link
          href="#"
          className={`inline-flex items-center ${colorMap[color].text} hover:underline mt-auto`}
        >
          了解更多 <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

// 首页组件
export default function HomePage() {
  return (
    <>
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            专业级 API 开发平台
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          从设计到部署的全生命周期 API 管理解决方案
        </p>
      </div>

      {/* 主CTA按钮 */}
      <div className="flex justify-center mb-16">
        <Button
          className="rounded-lg shadow-sm"
          style={{
            backgroundColor: '#fff',
            borderColor: 'rgb(128, 102, 255)',
            color: 'rgb(128, 102, 255)',
            height: 48,
            padding: '0 24px',
            fontSize: '1.125rem',
            fontWeight: 500,
            borderWidth: 2,
            borderRadius: '20px'
          }}
          href="/login"
        >
          进入EasyPost
        </Button>
      </div>

      {/* 核心功能展示 */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">核心功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Code className="h-6 w-6" />}
            title="接口测试"
            description="可视化接口调试与自动化测试，支持多种协议和认证方式"
            color="blue"
          />
          <FeatureCard
            icon={<FileText className="h-6 w-6" />}
            title="接口文档"
            description="自动生成实时更新的API文档，支持OpenAPI规范"
            color="green"
          />
          <FeatureCard
            icon={<Cloud className="h-6 w-6" />}
            title="数据Mock"
            description="智能Mock服务，支持动态响应和场景模拟"
            color="orange"
          />
        </div>
      </div>

      {/* 高级功能展示 */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">高级功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={<TestTube2 className="h-6 w-6" />}
            title="自动化测试"
            description="基于场景的自动化测试流程，支持CI/CD集成"
            color="purple"
          />
          <FeatureCard
            icon={<Gauge className="h-6 w-6" />}
            title="性能测试"
            description="分布式压力测试，实时性能监控与分析"
            color="blue"
          />
        </div>
      </div>
    </>
  )
}


import type React, { useEffect, useMemo, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import { Segmented, Space, Statistic, Table, Tabs, Tooltip } from 'antd'

import PostmanStyleJsonEditor from '@/components/JsonSchema/PostmanStyleJsonEditor'

interface RunResponseProps {
  value?: string
  headers?: Record<string, string>
  cookies?: {
    name: string
    value: string
    domain?: string
    path?: string
    expires?: string
  }[]
  actualRequest?: {
    method: string
    url: string
    headers: Record<string, string>
    body?: any
  }
  responseStatus?: number
  responseTime?: number
}

export const RunResponse: React.FC<RunResponseProps> = ({
  value = {},
  headers = {},
  cookies = [],
  actualRequest,
  responseStatus = 200,
  responseTime = 0,
}) => {
  const [body, setBody] = useState<string>('')
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startWidth, setStartWidth] = useState(0)
  const [alignValue, setAlignValue] = useState<'pretty' | 'raw' | 'preview'>('pretty')
  const [isEditorReady, setIsEditorReady] = useState(false)
  // 计算响应大小
  const responseSize = useMemo(
    () => (value.data ? new Blob([JSON.stringify(value.data)]).size : 0),
    [value.data]
  )

  const requestSize = useMemo(
    () => (actualRequest?.body ? new Blob([JSON.stringify(actualRequest.body)]).size : 0),
    [actualRequest?.body]
  )
  useEffect(() => {
    console.log('接口返回的数据为-------', value.values.data)
    if (value.values.data) {
      setBody(JSON.stringify(value.values.data, null, 2))
    }
  }, [value])

  // 拖拽逻辑
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setStartWidth(sidebarWidth)
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return
    }
    const newWidth = startWidth + (startX - e.clientX)
    setSidebarWidth(Math.max(200, Math.min(400, newWidth)))
  }
  useEffect(() => {
    if (body && !isEditorReady) {
      setIsEditorReady(true)
    }
  }, [body])
  const handleMouseUp = () => {
    if (!isDragging) {
      return
    }
    setIsDragging(false)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, startX, startWidth])

  // 渲染响应体
  const renderResponseBody = () => {
    if (!body) {
      return <div>No response data available</div>
    }

    switch (alignValue) {
      case 'pretty':
        return isEditorReady ? (
          <PostmanStyleJsonEditor defaultValue={body} disabled={true} value={body} />
        ) : (
          <div style={{ padding: 16, background: '#f5f5f5' }}>
            <SyntaxHighlighter language="json" style={docco}>
              {body}
            </SyntaxHighlighter>
          </div>
        )

      case 'raw':
        return (
          <SyntaxHighlighter language="json" style={docco}>
            {body}
          </SyntaxHighlighter>
        )
      case 'preview':
        return <div>{body}</div>
      default:
        return null
    }
  }

  // 表格配置
  const cookieColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    { title: 'Domain', dataIndex: 'domain', key: 'domain' },
    { title: 'Path', dataIndex: 'path', key: 'path' },
    { title: 'Expires', dataIndex: 'expires', key: 'expires' },
  ]

  const headerColumns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value: string) => (
        <SyntaxHighlighter language="text" style={docco}>
          {value}
        </SyntaxHighlighter>
      ),
    },
  ]

  // Tabs 配置
  const tabItems = [
    {
      key: 'body',
      label: 'Body',
      children: (
        <div>
          <Segmented
            options={[
              { label: 'Pretty', value: 'pretty' },
              { label: 'Raw', value: 'raw' },
              { label: 'Preview', value: 'preview' },
            ]}
            style={{ marginBottom: 16 }}
            value={alignValue}
            onChange={(value) => {
              setAlignValue(value as typeof alignValue)
            }}
          />
          {renderResponseBody()}
        </div>
      ),
    },
    {
      key: 'headers',
      label: 'Headers',
      children: (
        <Table
          columns={headerColumns}
          dataSource={Object.entries(headers || {}).map(([name, value]) => ({
            name,
            value,
            key: name,
          }))}
          pagination={false}
          rowKey="name"
          size="small"
        />
      ),
    },
    {
      key: 'request',
      label: 'Request',
      children: actualRequest ? (
        <div style={{ padding: 16 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 500, marginBottom: 8, fontSize: 16 }}>Request URL</div>
            <div>
              <span style={{ marginRight: 16 }}>{actualRequest.method}</span>
              <span>{actualRequest.url}</span>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 500, marginBottom: 8, fontSize: 16 }}>Headers</div>
            <Table
              columns={headerColumns}
              dataSource={Object.entries(actualRequest.headers || {}).map(([name, value]) => ({
                name,
                value,
                key: name,
              }))}
              pagination={false}
              rowKey="name"
              size="small"
            />
          </div>

          <div>
            <div style={{ fontWeight: 500, marginBottom: 8, fontSize: 16 }}>Body</div>
            {actualRequest.body ? (
              <SyntaxHighlighter language="json" style={docco}>
                {JSON.stringify(actualRequest.body, null, 2)}
              </SyntaxHighlighter>
            ) : (
              <div style={{ color: '#999' }}>No request body</div>
            )}
          </div>
        </div>
      ) : (
        <div>No request data</div>
      ),
    },
  ]

  return (
    <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
      {/* 主内容区域 */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          marginRight: sidebarWidth,
          transition: 'margin 0.2s',
        }}
      >
        <Tabs defaultActiveKey="body" items={tabItems} />
      </div>

      {/* 侧边栏 */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: sidebarWidth,
          background: '#fff',
          borderLeft: '1px solid #f0f0f0',
          padding: '16px',
          overflow: 'auto',
          boxSizing: 'border-box',
        }}
      >
        {/* 拖动条 */}
        <div
          style={{
            position: 'absolute',
            left: -5,
            top: 0,
            bottom: 0,
            width: 10,
            cursor: 'col-resize',
            zIndex: 1,
          }}
          onMouseDown={handleMouseDown}
        />

        {/* 统计信息 */}
        <Space
          direction="horizontal"
          size="middle"
          style={{
            width: '100%',
            justifyContent: 'space-between',
            padding: '12px 16px',
            fontSize: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            border: '1px solid #e8e8e8',
          }}
        >
          <Tooltip title="Status Code">
            <Statistic
              value={responseStatus}
              valueStyle={{
                color:
                  responseStatus >= 400 ? '#ff4d4f' : responseStatus >= 300 ? '#faad14' : '#52c41a',
                fontSize: '12px',
              }}
            />
          </Tooltip>

          <Tooltip title="Response Time">
            <Statistic
              precision={2}
              suffix="ms"
              value={responseTime}
              valueStyle={{ color: '#52c41a', fontSize: '12px' }}
            />
          </Tooltip>

          <Tooltip title="Request Size">
            <Statistic
              suffix="bytes"
              value={requestSize}
              valueStyle={{ color: '#52c41a', fontSize: '12px' }}
            />
          </Tooltip>

          <Tooltip title="Response Size">
            <Statistic
              suffix="bytes"
              value={responseSize}
              valueStyle={{ color: '#52c41a', fontSize: '12px' }}
            />
          </Tooltip>
        </Space>
      </div>
    </div>
  )
}

export default RunResponse

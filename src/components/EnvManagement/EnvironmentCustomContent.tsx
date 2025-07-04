import type React from 'react'
import  { useEffect, useState } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Input, Select, Table, Tabs } from 'antd'
import { nanoid } from 'nanoid'

import type { EnvironmentSetting, Server, Variable } from '@/types'

const typeOptions = [
  { value: 'string', label: 'string' },
  { value: 'number', label: 'number' },
  { value: 'boolean', label: 'boolean' },
  { value: 'object', label: 'object' },
]

const EnvironmentCustomContent: React.FC<{
  data: EnvironmentSetting
  onChange?: (newData: EnvironmentSetting) => void
}> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<'servers' | 'variables'>('servers')
  const [environmentSetting, setEnvironmentSetting] = useState<EnvironmentSetting>(() => ({
    ...data,
    servers: data.servers.length > 0 ? data.servers : [{ id: nanoid(), name: '', frontUrl: '' }],
    variables:
      data.variables.length > 0
        ? data.variables
        : [{ id: nanoid(), key: '', type: 'string', value: '', description: '' }],
  }))
  // 当父组件数据变化时更新本地状态
  useEffect(() => {
    setEnvironmentSetting({
      ...data,
      servers: data.servers.length > 0 ? data.servers : [{ id: nanoid(), name: '', frontUrl: '' }],
      variables:
        data.variables.length > 0
          ? data.variables
          : [{ id: nanoid(), key: '', type: 'string', value: '', description: '' }],
    })
  }, [data])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = { ...environmentSetting, name: e.target.value }
    setEnvironmentSetting(newData)
    onChange?.(newData)
  }

  const handleServerChange = (id: string, field: keyof Server, value: string) => {
    const updatedServers = environmentSetting.servers.map((server) =>
      server.id === id ? { ...server, [field]: value } : server
    )
    const newData = { ...environmentSetting, servers: updatedServers }
    setEnvironmentSetting(newData)
    onChange?.(newData)
  }

  const handleVariableChange = (id: string, field: keyof Variable, value: string) => {
    const updatedVariables = environmentSetting.variables.map((variable) =>
      variable.id === id ? { ...variable, [field]: value } : variable
    )
    const newData = { ...environmentSetting, variables: updatedVariables }
    setEnvironmentSetting(newData)
    onChange?.(newData)
  }

  const addServer = () => {
    const newServer = { id: nanoid(), name: '', frontUrl: '' }
    const newData = {
      ...environmentSetting,
      servers: [...environmentSetting.servers, newServer],
    }
    setEnvironmentSetting(newData)
    onChange?.(newData)
  }

  const addVariable = () => {
    const newVariable = { id: nanoid(), key: '', type: 'string', value: '', description: '' }
    const newData = {
      ...environmentSetting,
      variables: [...environmentSetting.variables, newVariable],
    }
    setEnvironmentSetting(newData)
    onChange?.(newData)
  }

  const removeServer = (id: string) => {
    const newData = {
      ...environmentSetting,
      servers: environmentSetting.servers.filter((server) => server.id !== id),
    }
    setEnvironmentSetting(newData)
    onChange?.(newData)
  }

  const removeVariable = (id: string) => {
    const newData = {
      ...environmentSetting,
      variables: environmentSetting.variables.filter((variable) => variable.id !== id),
    }
    setEnvironmentSetting(newData)
    onChange?.(newData)
  }

  const serverColumns = [
    {
      title: '服务名',
      dataIndex: 'name',
      render: (_: any, record: Server) => (
        <Input
          placeholder="服务名称"
          value={record.name}
          onChange={(e) => {
            handleServerChange(record.id, 'name', e.target.value)
          }}
        />
      ),
    },
    {
      title: '前置URL',
      dataIndex: 'frontUrl',
      render: (_: any, record: Server) => (
        <Input
          placeholder="前置URL"
          value={record.frontUrl}
          onChange={(e) => {
            handleServerChange(record.id, 'frontUrl', e.target.value)
          }}
        />
      ),
    },
    {
      title: '操作',
      render: (_: any, record: Server) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          type="link"
          onClick={() => {
            removeServer(record.id)
          }}
        />
      ),
    },
  ]

  const variableColumns = [
    {
      title: '变量名',
      dataIndex: 'key',
      render: (_: any, record: Variable) => (
        <Input
          placeholder="变量名"
          value={record.key}
          onChange={(e) => {
            handleVariableChange(record.id, 'key', e.target.value)
          }}
        />
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (_: any, record: Variable) => (
        <Select
          options={typeOptions}
          style={{ width: '100%' }}
          value={record.type}
          onChange={(value) => {
            handleVariableChange(record.id, 'type', value)
          }}
        />
      ),
    },
    {
      title: '值',
      dataIndex: 'value',
      render: (_: any, record: Variable) => (
        <Input
          placeholder="值"
          value={record.value}
          onChange={(e) => {
            handleVariableChange(record.id, 'value', e.target.value)
          }}
        />
      ),
    },
    {
      title: '操作',
      render: (_: any, record: Variable) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          type="link"
          onClick={() => {
            removeVariable(record.id)
          }}
        />
      ),
    },
  ]

  return (
    <div style={{ padding: 16 }}>
      {environmentSetting.id === 'local-mock' ||
      environmentSetting.id === 'remote-mock' ||
      environmentSetting.id === 'self-host-mock' ? (
        <span
          style={{
            display: 'inline-block',
            padding: '4px 11px',
            marginBottom: 16,
            color: '#1890ff',
            borderBottom: '1px solid #d9d9d9',
          }}
        >
          {environmentSetting.name}
        </span>
      ) : (
        <Input
          placeholder="环境名称"
          style={{ marginBottom: 16 }}
          value={environmentSetting.name}
          onChange={handleNameChange}
        />
      )}

      <Tabs
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key as 'servers' | 'variables')
        }}
      >
        <Tabs.TabPane key="servers" tab="服务列表">
          <Table
            columns={serverColumns}
            dataSource={environmentSetting.servers}
            footer={() => (
              <Button type="dashed" onClick={addServer}>
                添加服务
              </Button>
            )}
            pagination={false}
            rowKey="id"
          />
        </Tabs.TabPane>
        <Tabs.TabPane key="variables" tab="环境变量">
          <Table
            columns={variableColumns}
            dataSource={environmentSetting.variables}
            footer={() => (
              <Button type="dashed" onClick={addVariable}>
                添加变量
              </Button>
            )}
            pagination={false}
            rowKey="id"
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default EnvironmentCustomContent

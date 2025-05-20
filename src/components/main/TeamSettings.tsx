import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation' // 假设 TeamDetail 用于获取团队详情
import { Button, Form, Input, message, Modal, Table } from 'antd'

import { TeamDelete, TeamDetail, TeamSettingsDetail, TeamUpdate } from '@/api/team'
import { useGlobalContext } from '@/contexts/global'
import { ROUTES } from '@/utils/routes'

const TeamSettings = ({ teamId }) => {
  const [visible, setVisible] = useState(false)
  const [disbandVisible, setDisbandVisible] = useState(false) // 控制解散团队弹窗
  const [formData, setFormData] = useState({ key: '', label: '', teamName: '' })
  const [form] = Form.useForm()
  const [teamSettingsDetail, setTeamSettingsDetail] = useState(null)
  const { messageApi, fetchTeams } = useGlobalContext()
  const router = useRouter()
  const [teams, setTeams] = useState([])
  const handleTeamJumpTo = (teamId) => {
    router.push(ROUTES.TEAMS(teamId))
  }
  const fetchTeamInfo = async () => {
    try {
      const response = await TeamSettingsDetail(teamId)
      if (response.data.success) {
        setTeamSettingsDetail(response.data.data)
      }
    } catch (error) {
      message.error('获取团队信息异常')
    }
  }

  useEffect(() => {
    if (teamId) {
      fetchTeamInfo()
    }
  }, [teamId])

  useEffect(() => {
    if (visible) {
      form.setFieldsValue(formData)
    }
  }, [visible, formData, form])

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const normalDataSource = teamSettingsDetail
    ? [
        { key: '1', label: '团队名称', value: teamSettingsDetail.teamName },
        { key: '2', label: '团队ID', value: teamSettingsDetail.teamId },
        { key: '3', label: '我的团队内昵称', value: teamSettingsDetail.memeberName },
      ]
    : []

  const normalColumns = [
    {
      dataIndex: 'label',
      key: 'label',
      render: (text) => <span>{text}</span>,
      width: 80,
    },
    {
      dataIndex: 'value',
      key: 'value',
      render: (text) => <span>{text}</span>,
      width: 300,
    },
    {
      key: 'actions',
      render: (text, record) => {
        if (record.label === '团队ID') {
          return null
        }
        return (
          <Button
            onClick={() => {
              handleEdit(record)
            }}
          >
            编辑
          </Button>
        )
      },
      width: 100,
      align: 'right',
    },
  ]

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const dangerDataSource = teamSettingsDetail
    ? teamSettingsDetail.permission === 0
      ? [
          { key: '1', label: '移交', value: '将团队的所有者权限移交给其他成员' },
          { key: '2', label: '解散团队', value: '务必谨慎，解散后无法找回' },
        ]
      : [{ key: '3', label: '退出团队', value: '退出当前所在团队' }]
    : []

  const dangerColumns = [
    {
      dataIndex: 'label',
      key: 'label',
      render: (text) => <span>{text}</span>,
      width: 80,
    },
    {
      dataIndex: 'value',
      key: 'value',
      render: (text) => <span>{text}</span>,
      width: 300,
    },
    {
      key: 'actions',
      render: (text, record) => {
        const buttonText =
          record.label === '移交' ? '移交' : record.label === '退出团队' ? '退出' : '解散'
        return (
          <Button
            danger={record.label === '解散团队'}
            onClick={() => {
              if (record.label === '解散团队') {
                setDisbandVisible(true) // 显示解散团队弹窗
              }
            }}
          >
            {buttonText}
          </Button>
        )
      },
      width: 100,
      align: 'right',
    },
  ]

  const handleEdit = (record) => {
    setFormData({ key: record.key, label: record.label, teamName: record.value })
    setVisible(true)
  }

  const handleSubmit = async (values) => {
    const submitData = { id: teamId, ...values }
    try {
      const response = await TeamUpdate(submitData)
      if (response.data.success) {
        message.success(response.data.message)
        await fetchTeamInfo()
      } else {
        message.error(response.data.message || '更新失败')
      }
    } catch (error) {
      message.error('更新异常')
    }
    setVisible(false)
  }

  // 处理解散团队
  const handleDisbandTeam = async () => {
    const response = await TeamDelete(teamId)
    if (response.data.success) {
      message.success(response.data.message)
      setDisbandVisible(false)
      const teamList = await fetchTeams()
      setTeams(teamList)
      console.log('最新团队数据:', teamList)
      if (teamList.length > 0) {
        handleTeamJumpTo(teamList[0].id)
      } else {
        router.push(ROUTES.MAIN)
      }
    }
  }

  return (
    <div>
      <div style={{ fontSize: '16px', marginBottom: '10px' }}>基础信息</div>
      <div style={{ border: '0.5px solid #d9d9d9', borderRadius: '1px' }}>
        <Table
          bordered={false}
          columns={normalColumns}
          dataSource={normalDataSource}
          pagination={false}
          showHeader={false}
          style={{ backgroundColor: 'white', width: '100%', tableLayout: 'fixed' }}
        />
      </div>

      <div style={{ fontSize: '16px', marginBottom: '10px', marginTop: '20px' }}>危险区域</div>
      <div style={{ border: '0.5px solid #d9d9d9', borderRadius: '1px' }}>
        <Table
          bordered={false}
          columns={dangerColumns}
          dataSource={dangerDataSource}
          pagination={false}
          showHeader={false}
          style={{ backgroundColor: 'white', width: '100%', tableLayout: 'fixed' }}
        />
      </div>

      {/* 编辑弹窗 */}
      <Modal
        footer={null}
        title="修改"
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <Form form={form} initialValues={formData} onFinish={handleSubmit}>
          <Form.Item
            label={formData.label}
            name="teamName"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <Input key={formData.key} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              提交
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => {
                setVisible(false)
              }}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 解散团队确认弹窗 */}
      <Modal
        cancelText="取消"
        okButtonProps={{ danger: true }}
        okText="确认解散"
        title="警告"
        visible={disbandVisible}
        onCancel={() => {
          setDisbandVisible(false)
        }}
        onOk={handleDisbandTeam}
      >
        <p>你确定要解散当前团队吗？此操作不可撤销！</p>
      </Modal>
    </div>
  )
}

export default TeamSettings

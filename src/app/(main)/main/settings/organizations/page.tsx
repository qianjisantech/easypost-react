'use client'

import { Button, Card, Divider, Form, Input, Modal, Space, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { confirm } = Modal

export default function OrganizationSettings() {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('提交表单:', values)
    // 这里添加保存逻辑
  }

  const showDeleteConfirm = () => {
    confirm({
      title: '确定要删除这个组织吗？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复，所有相关数据也将被永久删除。',
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('确认删除组织')
        // 这里添加删除逻辑
      },
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Title level={3}>组织设置</Title>

      {/* 资料部分 */}
      <Card title="组织资料" className="mb-6">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: '示例组织',
            description: '这是一个示例组织',
            contact: 'contact@example.com'
          }}
        >
          <Form.Item
            label="组织名称"
            name="name"
            rules={[{ required: true, message: '请输入组织名称' }]}
          >
            <Input placeholder="请输入组织名称" />
          </Form.Item>

          <Form.Item
            label="组织描述"
            name="description"
          >
            <Input.TextArea rows={4} placeholder="请输入组织描述" />
          </Form.Item>

          <Form.Item
            label="联系方式"
            name="contact"
            rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input placeholder="请输入联系邮箱" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存更改
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* 危险区域部分 */}
      <Card title="危险区域" className="border-red-100">
        <div className="space-y-4">
          <div>
            <Title level={5} className="text-red-600">删除组织</Title>
            <Text type="secondary">
              删除后将无法恢复，请谨慎操作。删除前请确保已备份所有重要数据。
            </Text>
          </div>

          <Divider className="my-4" />

          <Space>
            <Button
              danger
              onClick={showDeleteConfirm}
            >
              删除组织
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  )
}
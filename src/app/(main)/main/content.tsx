'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Layout, message, Modal, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import TeamAPI from '@/api/team'
import { useGlobalContext } from '@/contexts/global'
import { ROUTES } from '@/utils/routes'
import UserAPI from "@/api/user";

// 单独提取的密码设置Modal组件
function PasswordModal({ visible, onClose, onSuccess }) {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            setLoading(true)
            const res = await UserAPI.setPassword({ password: values.password })
            if (res.data.success) {
                message.success(res.data.message)
                onSuccess?.()
            }
        } catch (error) {
            if (error.errorFields) {
                // 表单验证错误
                return
            }
            message.error('密码设置失败，请重试')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="设置初始密码"
            open={visible}
            onCancel={onClose}
            onOk={handleSubmit}
            confirmLoading={loading}
            closable={false}
            centered
            maskClosable={false}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="password"
                    label="新密码"
                    rules={[
                        { required: true, message: '请输入密码' },
                        { min: 6, message: '密码至少6位字符' }
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="请输入密码" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: '请确认密码' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve()
                                }
                                return Promise.reject(new Error('两次输入的密码不一致'))
                            }
                        })
                    ]}
                >
                    <Input.Password placeholder="请再次输入密码" />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default function MainContent() {
    const { Title, Text } = Typography
    const [loading, setLoading] = useState(false)
    const { messageApi, fetchTeams, needSetPassword } = useGlobalContext()
    const router = useRouter()
    const [passwordModalVisible, setPasswordModalVisible] = useState(false)

    useEffect(() => {
        if (needSetPassword) {
            setPasswordModalVisible(true)
        }
    }, [needSetPassword])

    const handleTeamJumpTo = (teamId) => {
        router.replace(ROUTES.TEAMS(teamId))
    }

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const res = await TeamAPI.create({ name: values.name })
            if (res.data.success) {
                message.success(res.data.message)
                handleTeamJumpTo(res.data.data.id)
                fetchTeams()
            } else {
                message.error(res.data.message || '创建团队失败')
            }
        } catch (error) {
            message.error('创建团队失败，请重试')
        } finally {
            setLoading(false)
        }
    }

    const handlePasswordSuccess = () => {
        setPasswordModalVisible(false)
        // 可以在这里添加密码设置成功后的逻辑
    }

    return (
        <Layout>
            <Content
                style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        width: '50%',
                        maxWidth: '400px',
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <Title level={2} style={{ marginBottom: 16 }}>创建团队</Title>
                    <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                        当前账号没有团队，请先创建
                    </Text>

                    <Form
                        initialValues={{ name: '' }}
                        layout="vertical"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="name"
                            rules={[
                                { required: true, message: '请输入团队名称!' },
                                { max: 20, message: '团队名称不超过20个字符' }
                            ]}
                        >
                            <Input placeholder="请输入团队名称" />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                block
                                htmlType="submit"
                                loading={loading}
                                type="primary"
                                size="large"
                            >
                                创建团队
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>

            {/* 密码设置Modal */}
            <PasswordModal
                visible={passwordModalVisible}
                onClose={() => setPasswordModalVisible(false)}
                onSuccess={handlePasswordSuccess}
            />
        </Layout>
    )
}
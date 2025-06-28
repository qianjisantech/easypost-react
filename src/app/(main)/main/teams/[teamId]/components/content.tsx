'use client'
import React, { useMemo, useState } from 'react'
import {
    Skeleton,
    Tag,
    Typography,
    Tabs,
    Button,
    Empty,
    Form,
    Input,
    message,
    Modal,
    Row,
    Col
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useGlobalContext } from "@/contexts/global"
import { useParams } from "next/navigation"
import { TeamContentProps } from "@/app/(main)/main/teams/[teamId]/types"
import Setting from "@/app/(main)/main/teams/[teamId]/components/setting";
import Member from "@/app/(main)/main/teams/[teamId]/components/member";
import {Project} from "@/app/(main)/main/teams/[teamId]/components/project";

const { Title, Text } = Typography

const TeamContent: React.FC<TeamContentProps> = ({
                                                     teamDetail,
                                                     projects = [],
                                                     members,
                                                     setting
                                                 }) => {
    const params = useParams()
    const teamId = params.teamId as string
    const { teams } = useGlobalContext()
    const [activeKey, setActiveKey] = useState('project')
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [form] = Form.useForm()

    // ================ 渲染组件 ================
    const renderTeamHeader = useMemo(() => {
        if (!teamDetail) return null

        const roleTag = teamDetail.role_type === 1 ? (
            <Tag color="red" style={{ marginLeft: 10 }}>团队所有者</Tag>
        ) : (
            <Tag color="green" style={{ marginLeft: 10 }}>团队成员</Tag>
        )

        return (
            <div style={{ margin: '20px 0 20px 20px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                }}>
                    <Title level={3} style={titleStyle}>
                        {teamDetail.name}
                        {roleTag}
                    </Title>
                    {activeKey === 'project' && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsModalVisible(true)}
                        >
                            新建项目
                        </Button>
                    )}
                </div>
            </div>
        )
    }, [teamDetail, activeKey])

    // ================ Tabs 配置 ================
    const tabItems = [
        {
            key: 'project',
            label: '团队项目',
            children: <Project />
        },
        {
            key: 'member',
            label: '成员/权限',
            children: <Member memberspage={members} />
        },
        {
            key: 'setting',
            label: '团队设置',
            children: <Setting teamSetting={setting} />
        }
    ]

    // 加载状态
    if (!teamDetail) {
        return (
            <div style={containerStyle}>
                <div>团队详情没有值</div>
            </div>
        )
    }

    return (
        <div style={containerStyle}>
            {renderTeamHeader}

            <Tabs
                activeKey={activeKey}
                onChange={setActiveKey}
                style={{ padding: '0 20px' }}
                items={tabItems}
            />

            <Modal
                title="新建项目"
                open={isModalVisible}
                onOk={() => {
                    form.validateFields()
                        .then(values => {
                            message.success('项目创建成功')
                            setIsModalVisible(false)
                            form.resetFields()
                        })
                        .catch(() => {
                            message.error('请填写完整信息')
                        })
                }}
                onCancel={() => setIsModalVisible(false)}
                okText="创建"
                cancelText="取消"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="项目名称"
                        rules={[{ required: true, message: '请输入项目名称' }]}
                    >
                        <Input placeholder="请输入项目名称" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="项目描述"
                    >
                        <Input.TextArea placeholder="请输入项目描述（可选）" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

// 样式常量
const containerStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    height: '100%',
    overflow: 'auto',
    flex: 1,
    minWidth: 0,
}

const titleStyle: React.CSSProperties = {
    margin: 0,
    color: 'rgb(52, 64, 84)',
    fontSize: '20px',
    fontWeight: 'normal',
}

const emptyContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
}

const emptyIconStyle: React.CSSProperties = {
    fontSize: '48px',
    marginBottom: '20px'
}

export default React.memo(TeamContent)
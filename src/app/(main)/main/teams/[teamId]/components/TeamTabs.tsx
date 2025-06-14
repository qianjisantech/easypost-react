import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Empty,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Spin,
  Tabs,
} from 'antd'
import { ProjectCreate, ProjectQueryPage } from '@/api/project'
import TeamSettings from '@/app/(main)/main/teams/[teamId]/components/TeamSettings'
import ProjectCard from './ProjectCard'

const { TabPane } = Tabs

interface TeamTabsProps {
  team: {
    id: string
    // 其他团队属性...
  }
}

interface ProjectCardData {
  id: string
  name: string
  // 其他项目属性...
}

const TeamTabs: React.FC<TeamTabsProps> = ({ team }) => {
  const [activeKey, setActiveKey] = useState('1')
  const [cardsData, setCardsData] = useState<ProjectCardData[]>([])
  const [loading, setLoading] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()

  // 获取项目数据
  const fetchCardsData = useCallback(async () => {
    if (!team?.id) return

    setLoading(true)
    setLoadFailed(false)

    try {
      const response = await ProjectQueryPage({
        page: 1,
        pageSize: 10,
        teamId: team.id,
      })
      const data = response.data.data
      setCardsData(data)
      if (data.length === 0) {
        setLoadFailed(true)
      }
    } catch (err) {
      setLoadFailed(true)
      message.error('团队项目数据加载失败')
    } finally {
      setLoading(false)
    }
  }, [team?.id])

  // 根据活动标签自动获取数据
  useEffect(() => {
    if (activeKey === '1' && cardsData.length === 0 && !loadFailed) {
      fetchCardsData()
    }
  }, [activeKey, cardsData.length, loadFailed, fetchCardsData])

  // 创建新项目
  const handleProjectFormSubmit = useCallback(async (values) => {
    try {
      await ProjectCreate({
        ...values,
        teamId: team.id,
      })
      setIsModalVisible(false)
      form.resetFields()
      await fetchCardsData() // 刷新项目列表
      message.success('项目创建成功')
    } catch (err) {
      message.error('项目创建失败')
    }
  }, [team?.id, fetchCardsData, form])

  // 打开创建项目模态框
  const handleCreateNewProject = useCallback(() => {
    form.resetFields()
    setIsModalVisible(true)
  }, [form])

  // 渲染项目卡片网格
  const renderProjectCards = useMemo(() => {
    if (loading) {
      return <Spin tip="加载中..." />
    }

    if (loadFailed || cardsData.length === 0) {
      return (
          <div style={emptyContainerStyle}>
            <Empty
                description={false}
                style={emptyIconStyle}
            />
          </div>
      )
    }

    return (
        <div style={{ width: '90%' }}>
          <Row gutter={[16, 16]} justify="start">
            {cardsData.map((card) => (
                <Col key={card.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                  <ProjectCard
                      card={card}
                      fetchCardsData={fetchCardsData}
                      teamId={team.id}
                  />
                </Col>
            ))}
          </Row>
        </div>
    )
  }, [loading, loadFailed, cardsData, fetchCardsData, team?.id])

  // 渲染标签栏右侧内容
  const renderTabBarExtraContent = useMemo(() => {
    if (activeKey !== '1') return null

    return (
        <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleCreateNewProject}
        >
          新建项目
        </Button>
    )
  }, [activeKey, handleCreateNewProject])

  return (
      <>
        <Tabs
            activeKey={activeKey}
            onChange={setActiveKey}
            tabBarExtraContent={renderTabBarExtraContent}
        >
          <TabPane key="1" tab="团队项目">
            <div style={{ position: 'relative' }}>
              {renderProjectCards}
            </div>
          </TabPane>

          <TabPane key="3" tab="成员/权限">
            {/* 成员权限组件可以在这里添加 */}
          </TabPane>

          <TabPane key="4" tab="团队设置">
            <TeamSettings teamSettingInfo={team} />
          </TabPane>
        </Tabs>

        {/* 新建项目模态框 */}
        <Modal
            destroyOnClose
            footer={null}
            title="新建项目"
            visible={isModalVisible}
            width={400}
            onCancel={() => setIsModalVisible(false)}
        >
          <Form
              form={form}
              name="create-project-form"
              style={{ marginTop: '20px' }}
              onFinish={handleProjectFormSubmit}
              initialValues={{
                isPublic: false // 默认私有
              }}
          >
            <Form.Item
                name="projectName"
                rules={[
                  { required: true, message: '请输入项目名称' },
                  { max: 20, message: '项目名称最多20个字符' }
                ]}
            >
              <Input
                  placeholder="请输入项目名称（最多20个字符）"
                  maxLength={20}
                  showCount
              />
            </Form.Item>

            <Form.Item name="isPublic">
              <Radio.Group>
                <Radio value={false}>私有</Radio>
                <Radio value={true}>公开</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" style={{ width: '100%' }} type="primary">
                创建项目
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
  )
}

// 样式常量
const emptyContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  minHeight: '200px',
}

const emptyIconStyle = {
  fontSize: '48px',
  transform: 'scale(2.5)',
  marginTop: '8%'
}

export default React.memo(TeamTabs)
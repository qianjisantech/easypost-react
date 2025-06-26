import React, { startTransition, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExportOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Popover, Radio, Tooltip } from 'antd'
import  ProjectAPI from '@/api/project'
export interface ProjectCardProps {
  card: {
    id: string
    name: string
    is_public: boolean
    icon: string
  }
  fetchCardsData: () => void
}

interface CardStyles {
  [key: string]: React.CSSProperties
}

const ProjectCard: React.FC<ProjectCardProps> = ({ card, fetchCardsData }) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredItem, setHoveredItem] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [privacy, setPrivacy] = useState(false)

  useEffect(() => {
    if (card) {
      console.log('card data',card)
      form.setFieldsValue({
        id: card.id,
        name: card.name,
        is_public: card.is_public,
        icon: card.icon,
      })
      setPrivacy(card.is_public)
    }
  }, [card, form])

  const handleCardClick = (route: string) => {
    startTransition(() => {
      router.push(route)
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleAction = async (action: string, e: React.MouseEvent) => {
    e.stopPropagation()
    switch (action) {
      case '修改项目':
        setIsModalVisible(true)
        return
      case '复制项目':
        await ProjectAPI.copy({newName: "", sourceId: "", id: card.id, teamId: "" })
        fetchCardsData()
        return
      case '删除项目':
        Modal.confirm({
          title: '确定删除该项目吗?',
          content: '删除后无法恢复，确认删除？',
          okText: '删除',
          cancelText: '取消',
          onOk: async () => {
            await ProjectAPI.delete(card.id)
            fetchCardsData()
          },
        })
        return
      case '新窗口打开':
        window.open(`/project`, '_blank')
        return
    }
    setPopoverVisible(false)
  }

  const handleProjectFormSubmit = async (values: any) => {
    try {
      await ProjectAPI.update({ ...values, id: card.id })
      fetchCardsData()
      setIsModalVisible(false)
      message.success('项目修改成功')
    } catch (err) {
      message.error('修改项目失败')
    }
  }

  const handlePrivacyChange = (e: any) => {
    setPrivacy(e.target.value)
  }

  const dropdownContent = (
      <div style={styles.dropdownMenu}>
        <div
            style={{
              ...styles.dropdownItem,
              ...(hoveredItem === 'modify' ? hoverStyles.dropdownItem : {}),
            }}
            onClick={(e) => handleAction('修改项目', e)}
            onMouseEnter={() => setHoveredItem('modify')}
            onMouseLeave={() => setHoveredItem('')}
        >
          <EditOutlined style={{
            ...styles.dropdownIcon,
            ...(hoveredItem === 'modify' ? hoverStyles.icon : {}),
          }} />
          <span style={hoveredItem === 'modify' ? hoverStyles.dropdownText : {}}>修改项目</span>
        </div>
        <div
            style={{
              ...styles.dropdownItem,
              ...(hoveredItem === 'copy' ? hoverStyles.dropdownItem : {}),
            }}
            onClick={(e) => handleAction('复制项目', e)}
            onMouseEnter={() => setHoveredItem('copy')}
            onMouseLeave={() => setHoveredItem('')}
        >
          <CopyOutlined style={{
            ...styles.dropdownIcon,
            ...(hoveredItem === 'copy' ? hoverStyles.icon : {}),
          }} />
          <span style={hoveredItem === 'copy' ? hoverStyles.dropdownText : {}}>复制项目</span>
        </div>
        <div
            style={{
              ...styles.dropdownItem,
              ...(hoveredItem === 'delete' ? hoverStyles.dropdownItem : {}),
            }}
            onClick={(e) => handleAction('删除项目', e)}
            onMouseEnter={() => setHoveredItem('delete')}
            onMouseLeave={() => setHoveredItem('')}
        >
          <DeleteOutlined style={{
            ...styles.dropdownIcon,
            ...(hoveredItem === 'delete' ? hoverStyles.icon : {}),
          }} />
          <span style={hoveredItem === 'delete' ? hoverStyles.dropdownText : {}}>删除项目</span>
        </div>
      </div>
  )

  return (
      <div
          style={{
            ...styles.card,
            ...(isHovered ? styles.cardHovered : {}),
          }}
          onClick={(e) => !isModalVisible && handleCardClick(`/project/${card.id}`)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.imageContainer} onClick={(e) => e.stopPropagation()}>
          <Image
              alt="Project Image"
              height={50}
              src={`/assets/svg/project/${card.icon}`}
              width={50}
          />
        </div>

        <div style={styles.cardTitleContainer}>
          <span>{card?.name}</span>
        </div>

        <div style={styles.projectLabelContainer}>
          <span style={styles.projectLabel}>{card?.is_public ? '公开' : '私有'}</span>
        </div>

        <div
            style={{
              ...styles.dotsContainer,
              display: isHovered ? 'flex' : 'none',
            }}
            onClick={(e) => e.stopPropagation()}
        >
          <Tooltip title="新窗口打开">
            <div
                onClick={(e) => handleAction('新窗口打开', e)}
                onMouseEnter={() => setHoveredItem('openInNewWindow')}
                onMouseLeave={() => setHoveredItem('')}
            >
              <ExportOutlined style={styles.icon} />
            </div>
          </Tooltip>
          <Tooltip title="收藏项目">
            <StarOutlined style={styles.icon} />
          </Tooltip>
          <Popover
              content={dropdownContent}
              placement="bottomRight"
              trigger="hover"
              open={popoverVisible}
              onOpenChange={(visible) => setPopoverVisible(visible)}
          >
            <EllipsisOutlined style={styles.icon} />
          </Popover>
        </div>

        <Modal
            footer={null}
            title="修改项目"
            open={isModalVisible}
            width={400}
            onCancel={handleModalCancel}
        >
          <Form
              form={form}
              name="update-project-form"
              style={{ marginTop: '20px' }}
              onFinish={handleProjectFormSubmit}
          >
            <Form.Item hidden name="id">
              <Input type="hidden" />
            </Form.Item>

            <Form.Item name="projectName" rules={[{ required: true, message: '项目名称为必填项' }]}>
              <Input placeholder="项目名称" />
            </Form.Item>

            <Form.Item name="isPublic">
              <Radio.Group value={privacy} onChange={handlePrivacyChange}>
                <Radio value={false}>私有</Radio>
                <Radio value={true}>公开</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" style={{ width: '100%' }} type="primary">
                修改
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  )
}

const styles: CardStyles = {
  card: {
    width: '240px',
    height: '170px',
    backgroundColor: '#fff',
    borderRadius: '5%',
    border: '0.5px solid rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    margin: '0 20px 20px 0',
    cursor: 'pointer',
  },
  cardHovered: {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  imageContainer: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a6cad7',
    borderRadius: '25%',
    padding: '5px',
  },
  cardTitleContainer: {
    position: 'absolute',
    top: '90px',
    left: '20px',
    fontSize: '16px',
    fontFamily: 'SimHei, Arial, sans-serif',
    textAlign: 'left',
    display: 'flex',
    color: 'rgb(52, 64, 84)',
    alignItems: 'center',
    padding: '5px',
    maxWidth: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  projectLabelContainer: {
    position: 'absolute',
    top: '130px',
    left: '20px',
    fontSize: '12px',
    fontFamily: 'Arial, sans-serif',
    color: '#5a5a5a',
  },
  projectLabel: {
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: '#f1f1f1',
  },
  dotsContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  icon: {
    fontSize: '16px',
    color: '#333',
    transition: 'color 0.2s',
  },
  dropdownMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '5px 0',
    minWidth: '50px',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  dropdownIcon: {
    marginRight: '8px',
    fontSize: '14px',
  },
}

const hoverStyles: CardStyles = {
  dropdownItem: {
    backgroundColor: '#f5f5f5',
    color: '#1890ff',
  },
  icon: {
    color: '#1890ff',
  },
  dropdownText: {
    color: '#1890ff',
  },
}

export default ProjectCard
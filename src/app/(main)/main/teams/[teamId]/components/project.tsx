'use client'
import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Typography, Empty, Skeleton, Segmented } from 'antd'
import { PlusOutlined, AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ProjectCard from './project-card'

const { Title } = Typography

interface Project {
    id: string
    name: string
    is_public: boolean
    icon: string
}

export const Project = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
    const [isModalVisible,setIsModalVisible]=useState(false)
    // 模拟获取项目数据
    const fetchProjects = async () => {
        try {
            setLoading(true)
            // 模拟数据
            const mockData: Project[] = [
                {
                    id: '1',
                    name: '电商平台',
                    is_public: true,
                    icon: 'pen-combination-svgrepo-com.svg',
                },
                {
                    id: '2',
                    name: '移动应用',
                    is_public: false,
                    icon: 'pen-combination-svgrepo-com.svg',
                },
                // ...其他模拟数据
            ]

            setTimeout(() => {
                setProjects(mockData)
                setLoading(false)
            }, 800)
        } catch (error) {
            console.error('获取项目列表失败:', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    if (loading) {
        return (
            <div style={{ padding: 24 }}>
                <Skeleton active paragraph={{ rows: 6 }} />
            </div>
        )
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div>
                    <Segmented
                        value={viewMode}
                        onChange={(value) => setViewMode(value as 'card' | 'list')}
                        options={[
                            {
                                label: (
                                    <div style={{ padding: '0 8px' }}>
                                        <AppstoreOutlined />
                                    </div>
                                ),
                                value: 'card',
                            },
                            {
                                label: (
                                    <div style={{ padding: '0 8px' }}>
                                        <BarsOutlined />
                                    </div>
                                ),
                                value: 'list',
                            },
                        ]}
                        style={{ marginRight: 16 }}
                    />
                </div>
            </div>

            {projects.length === 0 ? (
                <Empty
                    description="暂无项目，点击右上角按钮创建"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            ) : viewMode === 'card' ? (
                <Row gutter={[24, 24]}>
                    {projects.map((project) => (
                        <Col
                            key={project.id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            xl={4}
                            style={{ margin: '0.5%' }}
                        >
                            <ProjectCard
                                card={project}
                                fetchCardsData={fetchProjects}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <div style={{
                    background: '#fafafa',
                    padding: 24,
                    borderRadius: 8,
                    textAlign: 'center'
                }}>
                    <Empty
                        description="列表模式开发中"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </div>
            )}
        </div>
    )
}
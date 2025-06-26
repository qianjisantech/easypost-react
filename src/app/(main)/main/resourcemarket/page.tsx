'use client'
import React, { useState } from 'react'
import { Input, Select, Card, Avatar, Tag, Button, Divider, List, Typography } from 'antd'
import { SearchOutlined, StarOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import styles from './ResourceMarket.module.css'

const { Search } = Input
const { Option } = Select
const { Meta } = Card
const { Title, Text } = Typography

interface ResourceItem {
    id: string
    title: string
    description: string
    category: string
    downloads: number
    rating: number
    price: number
    isFree: boolean
    author: string
    avatar: string
    tags: string[]
}

const ResourceMarket: React.FC = () => {
    const [searchText, setSearchText] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('popular')

    // 模拟资源数据
    const resourceData: ResourceItem[] = [
        {
            id: '1',
            title: '企业UI组件库',
            description: '一套完整的企业级UI组件库，包含50+常用组件',
            category: 'ui',
            downloads: 2450,
            rating: 4.8,
            price: 0,
            isFree: true,
            author: 'AntDesign团队',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            tags: ['React', '组件库', '企业级']
        },
        {
            id: '2',
            title: '数据可视化模板',
            description: '基于ECharts的数据可视化模板，包含10+常用图表',
            category: 'template',
            downloads: 1890,
            rating: 4.7,
            price: 99,
            isFree: false,
            author: '数据可视化专家',
            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
            tags: ['ECharts', '图表', '数据']
        },
        {
            id: '3',
            title: '后台管理系统模板',
            description: 'React + Ant Design后台管理系统完整解决方案',
            category: 'template',
            downloads: 3200,
            rating: 4.9,
            price: 0,
            isFree: true,
            author: 'React开发者',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
            tags: ['React', 'Ant Design', '后台']
        },
        {
            id: '4',
            title: '移动端适配方案',
            description: '一站式解决移动端适配问题的完整方案',
            category: 'solution',
            downloads: 1560,
            rating: 4.6,
            price: 49,
            isFree: false,
            author: '前端架构师',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
            tags: ['响应式', '移动端', '适配']
        },
        {
            id: '5',
            title: '图标素材包',
            description: '2000+高质量SVG图标，适用于各种项目',
            category: 'asset',
            downloads: 4200,
            rating: 4.7,
            price: 0,
            isFree: true,
            author: '设计师联盟',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
            tags: ['图标', 'SVG', '素材']
        },
        {
            id: '6',
            title: '微前端架构指南',
            description: '企业级微前端架构实践指南与示例代码',
            category: 'solution',
            downloads: 980,
            rating: 4.9,
            price: 199,
            isFree: false,
            author: '架构师团队',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
            tags: ['微前端', '架构', '企业级']
        }
    ]

    // 过滤和排序资源
    const filteredResources = resourceData
        .filter(resource =>
            (selectedCategory === 'all' || resource.category === selectedCategory) &&
            (resource.title.toLowerCase().includes(searchText.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchText.toLowerCase()))
        )
        .sort((a, b) => {
            if (sortBy === 'popular') return b.downloads - a.downloads
            if (sortBy === 'rating') return b.rating - a.rating
            if (sortBy === 'price-low') return a.price - b.price
            if (sortBy === 'price-high') return b.price - a.price
            return 0
        })

    return (
        <div className={styles.container}>
            {/* 标题和搜索区域 */}
            <div className={styles.header}>
                <div className={styles.searchArea}>
                    <Search
                        placeholder="搜索资源..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </div>

            {/* 筛选和排序区域 */}
            <div className={styles.filterSection}>
                <div className={styles.categoryFilter}>
                    <Text strong style={{ marginRight: 12 }}>分类:</Text>
                    <Select
                        defaultValue="all"
                        style={{ width: 120 }}
                        onChange={value => setSelectedCategory(value)}
                    >
                        <Option value="all">全部</Option>
                        <Option value="ui">UI组件</Option>
                        <Option value="template">模板</Option>
                        <Option value="solution">解决方案</Option>
                        <Option value="asset">素材资源</Option>
                    </Select>
                </div>

                <div className={styles.sortFilter}>
                    <Text strong style={{ marginRight: 12 }}>排序:</Text>
                    <Select
                        defaultValue="popular"
                        style={{ width: 120 }}
                        onChange={value => setSortBy(value)}
                    >
                        <Option value="popular">最受欢迎</Option>
                        <Option value="rating">最高评分</Option>
                        <Option value="price-low">价格最低</Option>
                        <Option value="price-high">价格最高</Option>
                    </Select>
                </div>
            </div>

            <Divider />

            {/* 资源列表 */}
            <div className={styles.resourceList}>
                <List
                    grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                    dataSource={filteredResources}
                    renderItem={resource => (
                        <List.Item>
                            <Card
                                hoverable
                                cover={
                                    <div className={styles.cardCover}>
                                        <Avatar
                                            size={64}
                                            src={resource.avatar}
                                            className={styles.resourceAvatar}
                                        />
                                    </div>
                                }
                                actions={[
                                    <div key="download">
                                        <DownloadOutlined /> {resource.downloads}
                                    </div>,
                                    <div key="rating">
                                        <StarOutlined /> {resource.rating}
                                    </div>,
                                    <div key="view">
                                        <EyeOutlined /> 查看详情
                                    </div>
                                ]}
                            >
                                <Meta
                                    title={resource.title}
                                    description={
                                        <>
                                            <Text ellipsis>{resource.description}</Text>
                                            <div className={styles.tags}>
                                                {resource.tags.map(tag => (
                                                    <Tag key={tag}>{tag}</Tag>
                                                ))}
                                            </div>
                                            <div className={styles.priceSection}>
                                                {resource.isFree ? (
                                                    <Tag color="green">免费</Tag>
                                                ) : (
                                                    <Text strong>¥{resource.price}</Text>
                                                )}
                                                <Text type="secondary" className={styles.author}>by {resource.author}</Text>
                                            </div>
                                        </>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )
}

export default ResourceMarket
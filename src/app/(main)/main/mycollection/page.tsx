'use client'
import React from 'react'
import { List, Typography, Avatar, Tag, Space } from 'antd'
import { ClockCircleOutlined, LinkOutlined, StarOutlined } from '@ant-design/icons'
import styles from './MyCollection.module.css'

const { Text } = Typography

interface VisitItem {
    id: string
    title: string
    url: string
    icon?: string
    timestamp: string
    isNew?: boolean
}

const RecentlyVisited: React.FC = () => {
    // 模拟最近访问数据并按时间倒序排列
    const visitData: VisitItem[] = [
        {
            id: '5',
            title: '团队协作',
            url: '/team',
            icon: '👨‍💻',
            timestamp: '今天',
            isNew: true
        },
        {
            id: '4',
            title: '文档中心',
            url: '/docs',
            icon: '📚',
            timestamp: '2小时前'
        },
        {
            id: '3',
            title: '项目设置',
            url: '/projects/setting',
            icon: '⚙️',
            timestamp: '1小时前'
        },
        {
            id: '2',
            title: '数据分析看板',
            url: '/dashboard/analytics',
            icon: '📊',
            timestamp: '30分钟前'
        },
        {
            id: '1',
            title: '用户管理后台',
            url: '/admin/users',
            icon: '👥',
            timestamp: '10分钟前'
        }
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return (
        <div className={styles.container}>
            {/* 标题区域 */}
            <div className={styles.header}>
                <div className={styles.headerTitle}>
                    <span>我的收藏</span>
                </div>
            </div>

            {/* 访问列表 */}
            <List
                dataSource={visitData}
                renderItem={(item) => (
                    <List.Item className={styles.listItem}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    size={48}
                                    className={styles.squareAvatar}
                                    style={{ fontSize: 16, borderRadius: '4px' }}
                                >
                                    {item.icon}
                                </Avatar>
                            }
                            title={
                                <>
                                    <a href={item.url}>{item.title}</a>
                                </>
                            }
                        />
                        <div className={styles.actionIcons}>
                            <LinkOutlined className={styles.listIcon} />
                            <StarOutlined className={styles.listIcon} />
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default RecentlyVisited
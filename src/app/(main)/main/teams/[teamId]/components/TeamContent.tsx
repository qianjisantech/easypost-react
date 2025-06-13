'use client'
import React, {useEffect, useState} from 'react'

import { message, Skeleton, Tag, Typography} from 'antd' // 导入 Skeleton
import {Content} from 'antd/es/layout/layout'

import TeamAPI from '@/api/team'
import LoadingSpinner from '@/app/(main)/main/teams/[teamId]/components/LoadingSpinner'
import TeamTabs from '@/app/(main)/main/teams/[teamId]/components/TeamTabs'

const {Title} = Typography

const TeamsContent = ({loading, teamId}) => {
    const [teamDetail, setTeamDetail] = useState(null)
    const [isLoadingDetail, setIsLoadingDetail] = useState(true)
    const [activeTabKey, setActiveTabKey] = useState('1') // 默认激活"团队项目" Tab

    // 模拟根据 teamId 获取团队详情
    const fetchTeamDetail = async (teamId) => {
        setIsLoadingDetail(true)
        const res = await TeamAPI.getDetail(teamId)
        if (res.data.success) {
            setTeamDetail(res.data.data)
            setIsLoadingDetail(false)
        } else {
            message.error('查询报错')
        }
    }

    // 在组件加载时获取团队详情
    useEffect(() => {
        if (teamId) {
            fetchTeamDetail(teamId)
        }
    }, [teamId])

    // 处理 Tab 切换
    const handleTabChange = (key) => {
        setActiveTabKey(key)
    }

    // 渲染内容
    const renderContent = () => (
        <>
            {/* 加载中状态 */}
            {loading && <LoadingSpinner/>}

            {/* 团队信息 */}
            {isLoadingDetail ? (
                <div style={{marginBottom: 20, marginLeft: 10}}>
                    <Skeleton active paragraph={{rows: 1}}/>
                </div>
            ) : (
                <div style={{marginBottom: 20, marginLeft: 10}}>
                    {teamDetail && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <Title level={3}
                                   style={{
                                       margin: 0,
                                       color: 'rgb(52, 64, 84)',
                                       fontSize: '20px',
                                       fontWeight: 'normal',
                                       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", roboto, "Helvetica Neue", arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
                                   }} type="primary">
                                {teamDetail.teamName}

                                {teamDetail.teamPermission === 0 ? (
                                    <Tag color="red" style={{marginLeft: 10,fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", roboto, "Helvetica Neue", arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'}}>
                                        团队所有者
                                    </Tag>
                                ) : (
                                    <Tag color="green" style={{marginLeft: 10,fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", roboto, "Helvetica Neue", arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'}}>
                                        团队成员
                                    </Tag>
                                )}
                            </Title>
                        </div>
                    )}
                </div>
            )}

            {/* 项目 Tabs */}
            <TeamTabs teamId={teamId}/>
        </>
    )

    return (
        <div style={{
            backgroundColor: '#fff',
            height: '100%',
            overflow: 'auto',
            flex: 1, // 自动填充剩余空间
            minWidth: 0 ,// 防止内容溢出
        }}>
            <Content
                style={{
                    padding: '16px',
                    height: '100%',
                    overflow: 'auto',
                    boxSizing: 'border-box',
                    marginLeft:'10px'
                }}
            >
                {renderContent()}
            </Content>
        </div>
    )
}

export default TeamsContent

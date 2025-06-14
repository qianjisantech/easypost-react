'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { Skeleton, Tag, Typography } from 'antd'
import { Content } from 'antd/es/layout/layout'
import TeamTabs from '@/app/(main)/main/teams/[teamId]/components/TeamTabs'
import { useGlobalContext } from "@/contexts/global"
import { Team } from "@/contexts/types"

const { Title } = Typography

interface TeamContentProps {
    loading: boolean
    teamId: string
}

const TeamContent: React.FC<TeamContentProps> = ({ loading, teamId }) => {
    const [teamDetail, setTeamDetail] = useState<Team | null>(null)
    const { teams } = useGlobalContext()

    // 合并加载状态
    const isLoading = useMemo(() => loading || !teamId || teams.length === 0, [loading, teamId, teams.length])

    // 查找团队详情
    useEffect(() => {
        if (!teamId || teams.length === 0) return

        const foundTeam = teams.find(team => team.id === teamId)
        setTeamDetail(foundTeam || null)
    }, [teamId, teams])

    // 渲染团队标题和角色标签
    const renderTeamHeader = useMemo(() => {
        if (!teamDetail) return null

        const roleTag = teamDetail.roleType === 1 ? (
            <Tag color="red" style={{ marginLeft: 10 }}>团队所有者</Tag>
        ) : (
            <Tag color="green" style={{ marginLeft: 10 }}>团队成员</Tag>
        )

        return (
            <div style={{ marginBottom: 20, marginLeft: 20,marginTop:20 }}>
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
                </div>
            </div>
        )
    }, [teamDetail])

    // 加载状态渲染
    if (isLoading) {
        return (
            <div style={containerStyle}>
                <Content >
                    <div style={{ marginBottom: 20, marginLeft: 10 }}>
                        <Skeleton active paragraph={{ rows: 1 }} />
                    </div>
                    <Skeleton active paragraph={{ rows: 4 }} />
                </Content>
            </div>
        )
    }

    return (
        <div style={containerStyle}>
            <Content >
                {renderTeamHeader}
                {teamDetail && <TeamTabs team={teamDetail} />}
            </Content>
        </div>
    )
}

// 样式抽离为常量
const containerStyle = {
    backgroundColor: '#fff',
    height: '100%',
    overflow: 'auto',
    flex: 1,
    minWidth: 0,
}

const contentStyle = {
    padding: '16px',
    height: '100%',
    overflow: 'auto',
    boxSizing: 'border-box',
    marginLeft: '10px'
}

const titleStyle = {
    margin: 0,
    color: 'rgb(52, 64, 84)',
    fontSize: '20px',
    fontWeight: 'normal',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", roboto, "Helvetica Neue", arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji"'
}

export default React.memo(TeamContent)
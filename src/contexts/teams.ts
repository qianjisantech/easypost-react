// hooks/teams.ts
'use client'

import { useState } from 'react'
import { message } from 'antd'
import TeamAPI from '@/api/team'
import type { Team } from '@/contexts/types'
export function useTeamsContext() {
    const [teams, setTeams] = useState<Team[]>([])
    const [loading, setLoading] = useState(false)
    console.log('进入获取团队的逻辑')
    const fetchTeams = async () => {
        setLoading(true)
        try {
            const res = await TeamAPI.queryPage({pageNum: 1, pageSize: 10})
            if (res.data.success) {
                setTeams(res.data.data)
                return res.data.data
            } else {
                message.error('团队加载失败')
                return []
            }
        } catch (error) {
            message.error('获取团队失败')
            return []
        } finally {
            setLoading(false)
        }
    }

    return {
        teams,
        loading,
        fetchTeams,
        setTeams
    }
}
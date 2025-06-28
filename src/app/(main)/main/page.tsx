'use client'
import { useEffect, useState } from 'react'
import { Button, Typography, Input, message } from 'antd'
import { ResetPasswordModal } from '@/app/(main)/main/components/ResetPasswordModal';
import { useGlobalContext } from '@/contexts/global';
const { Title, Text } = Typography

export default function MainPage() {
    const [loading, setLoading] = useState(false)
    const [teamName, setTeamName] = useState('')
    const {fetchTeams, needSetPassword } = useGlobalContext()
    const [passwordModalVisible,setPasswordModalVisible] = useState(false)
    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => setLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    const handleCreateTeam = () => {
        if (!teamName.trim()) {
            message.warning('请输入团队名称')
            return
        }
        if (teamName.length > 50) {
            message.warning('团队名称不能超过50个字符')
            return
        }

        message.success(`团队"${teamName}"创建成功`)
        setTeamName('')
    }
    const handlePasswordSuccess = () => {
        setPasswordModalVisible(false)
        // 可以在这里添加密码设置成功后的逻辑
    }
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 24
        }}>
            <div style={{
                marginTop: '10%',
                width: '100%',
                maxWidth: 500,
                padding: 40,
                backgroundColor: '#fff',
                borderRadius: 8,
                textAlign: 'center'
            }}>
                <Title level={4} style={{ marginBottom: 24 }}>创建团队</Title>
                <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
                    当前没有任何团队，请先创建团队
                </Text>

                <Input
                    placeholder="请输入团队名称（最多50个字符）"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    maxLength={50}
                    showCount
                    size={'large'}
                    style={{ marginBottom: 32 }}
                />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="primary"
                        size={"large"}
                        onClick={handleCreateTeam}
                        style={{ width: 200 }}
                        loading={loading}
                    >
                        创建团队
                    </Button>
                </div>
            </div>
            <ResetPasswordModal
              visible={passwordModalVisible}
              onClose={() => setPasswordModalVisible(false)}
              onSuccess={handlePasswordSuccess}
            />
        </div>


    )
}
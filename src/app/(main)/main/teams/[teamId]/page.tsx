'use client'
import TeamContent from "@/app/(main)/main/teams/[teamId]/components/content";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import ProjectAPI from "@/api/project";
import TeamAPI, { Team } from "@/api/team";
import { Project, TeamMembers, TeamSetting } from "@/app/(main)/main/teams/[teamId]/types";
import { useTeamsContext } from '@/contexts/teams';

export default function TeamPage() {
    const params = useParams();
    const teamId = params.teamId as string;
    const router = useRouter();
    const [teamDetail, setTeamDetail] = useState<Team | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [members, setMembers] = useState<TeamMembers | null>(null);
    const [setting, setSetting] = useState<TeamSetting | null>(null);

    // 正确解构 useTeamsContext 返回的对象
    const { teams, fetchTeams } = useTeamsContext();

    // 获取项目数据
    const fetchProjects = async () => {
        const res = await ProjectAPI.page({ name: '' });
        if (res.data.success) {
            setProjects(res.data.data);
        }
    };

    // 获取成员数据
    const fetchMember = async () => {
        const res = await TeamAPI.memberpage({
            current: 1,
            name: '',
            pageSize: 10
        });
        if (res.data.success) {
            setMembers(res.data.data);
        }
    };

    // 获取团队设置
    const getTeamSetting = async () => {
        const res = await TeamAPI.getSetting();
        if (res.data.success) {
            setSetting(res.data.data);
        }
    };

    // 获取团队详情
    const getTeamDetail = async () => {
        // 先确保获取了团队列表
        const teamsData = await fetchTeams();

        // 从返回的数据或状态中查找当前团队
        const currentTeam = teamsData.find(team => team.id === teamId) ||
            teams.find(team => team.id === teamId);

        if (currentTeam) {
            setTeamDetail({
                id: currentTeam.id,
                name: currentTeam.name,
                role_type: currentTeam.role_type
            });
        } else {
            message.error('未找到该团队');
            router.push(ROUTES.MAIN);
        }
    };

    useEffect(() => {
        if (!teamId) {
            router.push(ROUTES.MAIN);
            return;
        }

        // 使用 async/await 确保顺序执行
        const initData = async () => {
            try {
                await getTeamDetail();
                await Promise.all([
                    fetchProjects(),
                    fetchMember(),
                    getTeamSetting()
                ]);
            } catch (error) {
                console.error('初始化数据失败:', error);
                message.error('初始化数据失败');
            }
        };

        initData();
    }, [teamId, router]);

    return (
        <TeamContent
            teamDetail={teamDetail}
            projects={projects}
            members={members}
            setting={setting}
        />
    );
}
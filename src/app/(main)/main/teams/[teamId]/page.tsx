'use client'
import TeamContent from "@/app/(main)/main/teams/[teamId]/components/TeamContent";
import { Content } from "antd/es/layout/layout";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {ROUTES} from "@/utils/routes"; // 添加 useRouter 用于跳转

export default function TeamPage() {
  const params = useParams();
  const router = useRouter(); // 获取路由方法
  const teamId = params.teamId as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // 新增错误状态

  useEffect(() => {
    if (!teamId) {
      setError("团队 ID 不存在"); // 设置错误提示
      router.push(ROUTES.MAIN); // 可选：跳转到默认页（如团队列表）
      setLoading(true);
      return;
    }else {
      setLoading(false);
    }

    console.log('正在加载团队数据，teamId:', teamId);
  }, [teamId, router]); // 依赖 router

  return (
      <Layout style={{ display: 'flex', height: '100vh', flexDirection: 'row' }}>
        <Content style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
          {error ? (
              <div style={{ padding: 24, color: "red" }}>{error}</div>
          ) : (
              <TeamContent loading={loading} teamId={teamId} />
          )}
        </Content>
      </Layout>
  );
}
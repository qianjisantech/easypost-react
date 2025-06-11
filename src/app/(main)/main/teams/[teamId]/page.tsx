// 服务端组件部分（静态生成）
import TeamClientPage from './client'

export async function generateStaticParams() {
  return [
    { teamId: '1931231246977863680' },
  ]
}

export default function TeamPage({ params }: { params: { teamId: string } }) {
  return <TeamClientPage teamId={params.teamId}/>
}
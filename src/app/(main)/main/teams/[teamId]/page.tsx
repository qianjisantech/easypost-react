import TeamClientPage from "@/app/(main)/main/teams/[teamId]/client";


export async function generateStaticParams() {
  return [];
}
export const dynamicParams = true;
export default function TeamPage({ params }: { params: { teamId: string } }) {
  return <TeamClientPage teamId={params.teamId}></TeamClientPage>
}
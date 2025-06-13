import ProjectClientPage from "@/app/(main)/project/[projectId]/client";

export async function generateStaticParams() {
return []
}

export default function  ProjectPage({ params }: { params: { projectId: string } }) {
    return <ProjectClientPage projectId={params.projectId}/>
}
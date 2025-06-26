export interface Team {
    id: string
    name: string
    description:string
    role_type:number
    organizationId:string
}
export interface TeamMembers {
    total:number
    totalPages: number
    current: number
    pageSize: number
    records: MemberRecord[]
}

export  interface MemberRecord {
    id:string
    name:string
    username:string
    email:string
    permission:number
}

export  interface TeamSetting{
    id:string
    name:string
    permission:number
}

export interface Project {
    id:string
    name:string
    icon:string
    is_public:boolean
}

export interface TeamContentProps {
    teamDetail: Team|null
    projects: Project[]
    members: TeamMembers|null
    setting: TeamSetting|null
}
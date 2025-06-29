// contexts/types.ts
import type React from "react";
import { EnvironmentSetting } from "@/types";
import { Modal } from "antd";

type ModalHookApi = ReturnType<typeof Modal.useModal>[0]

export interface Team {
    id: string
    name: string
    description:string
    roleType:number
    organizationId:string
}

export interface GlobalContextData {
    modal: ModalHookApi
    teams: Team[]
    fetchTeams: () => Promise<Team[]> // 明确返回 Team[] 类型
    needSetPassword: boolean
    setNeedSetPassword: React.Dispatch<React.SetStateAction<boolean>>
    setEnvironmentSettingContext: (environmentSetting: EnvironmentSetting) => void
    environmentSettingContext: EnvironmentSetting
    setTeams: React.Dispatch<React.SetStateAction<Team[]>> // 新增 setTeams 类型
    setGlobalLoading: React.Dispatch<React.SetStateAction<boolean>>
    globalLoading:boolean
}

export interface Project {
    id: string
    name: string
    description?: string
    creatorId: string
    createTime?: string
    updateTime?: string
    // status?: 'active' | 'archived'
    teamId?: string
}
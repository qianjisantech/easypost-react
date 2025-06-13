// stores/api.ts
import { create } from 'zustand'

type LoadingState = Record<string, boolean>

interface ApiStore {
    loading: LoadingState
    setLoading: (key: string, state: boolean) => void
    getLoading: (key?: string) => boolean
}

export const useApiStore = create<ApiStore>((set, get) => ({
    loading: {},
    setLoading: (key, state) => {
        set((state) => ({
            loading: { ...state.loading, [key]: state }
        }))
    },
    getLoading: (key) => {
        if (!key) return Object.values(get().loading).some(Boolean)
        return !!get().loading[key]
    }
}))

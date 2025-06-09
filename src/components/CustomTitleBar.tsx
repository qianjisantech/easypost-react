// components/CustomTitleBar.tsx
'use client'
import { appWindow } from '@tauri-apps/api/window'
import { Maximize2, Minimize2, X, Square } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function CustomTitleBar() {
    const [isMaximized, setIsMaximized] = useState(false)

    useEffect(() => {
        const updateMaximized = async () => {
            setIsMaximized(await appWindow.isMaximized())
        }

        const unlisten = appWindow.onResized(() => updateMaximized())
        updateMaximized()

        return () => {
            unlisten.then(f => f())
        }
    }, [])

    return (
        <div
            data-tauri-drag-region
            className="h-10 flex items-center justify-between px-4 bg-gray-100 dark:bg-gray-800"
        >
            {/* 左侧标题（可拖拽区域） */}
            <span
                data-tauri-drag-region
                className="text-sm font-medium select-none"
            >
        My App
      </span>

            {/* 右侧控制按钮 */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => appWindow.minimize()}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    <Minimize2 size={14} />
                </button>
                <button
                    onClick={() => appWindow.toggleMaximize()}
                    className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    {isMaximized ? <Square size={12} /> : <Maximize2 size={12} />}
                </button>
                <button
                    onClick={() => appWindow.close()}
                    className="p-1 rounded hover:bg-red-500 hover:text-white"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    )
}
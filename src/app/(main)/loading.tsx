// app/(main)/loading.tsx
'use client'
import { Suspense } from 'react'

export default function CosmicLoading() {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
            <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold text-white/80 mb-4">
                    正在穿越星际...
                </h2>
                <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-[progress_2s_ease-in-out_infinite]"></div>
                </div>
            </div>
        </div>
    )
}
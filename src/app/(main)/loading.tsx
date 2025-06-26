'use client'

export default function CosmicLoading() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
            <div className="w-20 h-20 rounded-full border-4 border-amber-200 border-t-amber-400 animate-spin"></div>
        </div>
    )
}
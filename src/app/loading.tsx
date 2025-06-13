// app/loading.tsx
'use client'
import { useEffect, useState } from 'react'

const cyberTexts = [
    '> 初始化量子连接...',
    '> 解密数据流...',
    '> 绕过防火墙...',
    '> 注入代码...'
]

export default function Loading() {
    const [textIndex, setTextIndex] = useState(0)
    const [show, setShow] = useState(true)

    useEffect(() => {
        // 文本轮换
        const textTimer = setInterval(() => {
            setTextIndex(prev => (prev + 1) % cyberTexts.length)
        }, 10000)

        // 3秒后自动消失
        const hideTimer = setTimeout(() => {
            setShow(false)
        }, 10000)

        return () => {
            clearInterval(textTimer)
            clearTimeout(hideTimer)
        }
    }, [])

    if (!show) return null

    return (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4 font-mono">
            <div className="border-2 border-green-400 p-6 w-full max-w-lg bg-black/90 shadow-lg shadow-green-400/20">
                <div className="flex items-center mb-4">
                    <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-green-400 mb-4">
                    <p className="mb-1">$ sudo load_system --mode=full</p>
                    <p className="text-white/70">{cyberTexts[textIndex]}</p>
                </div>
                <div className="w-full bg-gray-800 h-1.5 mb-2">
                    <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-full"
                        style={{
                            width: `${(textIndex + 1) * 25}%`,
                            transition: 'width 0.5s ease-out'
                        }}
                    ></div>
                </div>
                <p className="text-xs text-gray-500">// 0x7F3A...C2B9</p>
            </div>
        </div>
    )
}
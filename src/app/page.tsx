// app/page.tsx
import { redirect } from 'next/navigation'
import {ROUTES} from "@/utils/routes";

export default function AppPage() {
    const token = localStorage.getItem('token')
    // 根据验证结果重定向
    if (token) {
        redirect(ROUTES.MAIN) // 已登录用户重定向到主页
    } else {
        redirect(ROUTES.LOGIN) // 未登录用户重定向到登录页
    }
}
import {RouterGuard} from "@/contexts/router-guard";
import React from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return <RouterGuard children={children}></RouterGuard>
}
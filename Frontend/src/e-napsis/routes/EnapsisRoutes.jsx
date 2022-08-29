import { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"

import { CalendarRoutes } from "../calendar/routes"
import { CompanyRoutes } from "../company/routes/"
import { HomeRoutes } from "../home/routes"

import { LayoutApp } from "../ui/layout"
import { useSidebarStore } from "../../hooks"

export const EnapsisRoutes = () => {

    const { pathname } = useLocation()
    const { setByUrlActiveItem, activeItem } = useSidebarStore()

    useEffect(() => {
        if(!(!!activeItem.name)) {
            setByUrlActiveItem(pathname)
        }
    }, [pathname])

    return (
        <LayoutApp>
            <Routes>
                {/* Empresas */}
                <Route path="empresas/*" element={<CompanyRoutes />} />

                {/* Calendario */}
                <Route path="calendario/*" element={<CalendarRoutes />} />

                {/* Home */}
                <Route path="/*" element={<HomeRoutes />} />
            </Routes>
        </LayoutApp>
    )
}

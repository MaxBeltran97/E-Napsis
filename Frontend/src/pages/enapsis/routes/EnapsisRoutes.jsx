import { Route, Routes, useLocation } from 'react-router-dom'
import { CALENDAR_COURSE, COMPANIES, COURSES, PARTICIPANTS, TELLERS } from '@models/privateRoutes'

import { LayoutApp } from '../layout'

import { CalendarRoutes } from '../pages/calendar/routes'
import { CompanyRoutes } from '../pages/company/routes'
import { CourseRoutes } from '../pages/course/routes'
import { HomeRoutes } from '../pages/home/routes'
import { ParticipantRoutes } from '../pages/participant/routes'
import { TellerRoutes } from '../pages/teller/routes'

import { useUiStore } from '@hooks/useUiStore'
import { useEffect } from 'react'
import { useCompanyStore } from '@hooks/useCompanyStore'

export const EnapsisRoutes = () => {
  const { pathname } = useLocation()
  const { setByUrlSidebarActiveItem, sidebarActiveItem } = useUiStore()
  // const { startGetCompanies } = useCompanyStore()

  useEffect(() => {
    if(!(!!sidebarActiveItem.name) || (sidebarActiveItem.activeOption?.url !== pathname)) {
      setByUrlSidebarActiveItem(pathname)
    }
  }, [pathname])
  
  useEffect(() => {
    if(!!sidebarActiveItem.name) {
      document.title = `e-Napsis - ${sidebarActiveItem.name}`
    }
  }, [sidebarActiveItem])

  // useEffect(() => {
  //   startGetCompanies()
  // }, [])

  return (
    <LayoutApp>
      <Routes>
        <Route path={`${COMPANIES}/*`} element={<CompanyRoutes />} />

        <Route path={`${TELLERS}/*`} element={<TellerRoutes />} />

        <Route path={`${PARTICIPANTS}/*`} element={<ParticipantRoutes />} />
        
        <Route path={`${COURSES}/*`} element={<CourseRoutes />} />

        <Route path={`${CALENDAR_COURSE}/*`} element={<CalendarRoutes />} />

        <Route path='/*' element={<HomeRoutes />} />
      </Routes>
    </LayoutApp>
      
  )
}

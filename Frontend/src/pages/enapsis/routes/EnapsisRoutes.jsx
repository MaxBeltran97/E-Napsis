import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CALENDAR_COURSE, CLASS_BOOKS, COMPANIES, COURSES, PARTICIPANTS, SETTINGS, TELLERS } from '@models/privateRoutes'

import { LayoutApp } from '../layout'

import { CalendarRoutes } from '../pages/calendar/routes'
import { CompanyRoutes } from '../pages/company/routes'
import { CourseRoutes } from '../pages/course/routes'
import { HomeRoutes } from '../pages/home/routes'
import { ParticipantRoutes } from '../pages/participant/routes'
import { TellerRoutes } from '../pages/teller/routes'
import { ClassBooksRoutes } from '../pages/classBooks/routes'
import { SettingsRoutes } from '../pages/settings/routes'

import { useUiStore } from '@hooks/useUiStore'

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

        <Route path={`${CLASS_BOOKS}/*`} element={<ClassBooksRoutes />} />

        <Route path={`${SETTINGS}/*`} element={<SettingsRoutes />} />

        <Route path='/*' element={<HomeRoutes />} />
      </Routes>
    </LayoutApp>
      
  )
}

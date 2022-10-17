import { Navigate, Route, Routes } from "react-router-dom"
import { ADD_CALENDAR_COURSE, CALENDAR_COURSE, SHOW_CALENDAR_COURSE } from "@models/privateRoutes"

import { AddCalendarCoursePage, ShowCalendarPage } from "../pages"

export const CalendarRoutes = () => {
  return (
    <Routes>
      <Route path={`${ADD_CALENDAR_COURSE}`} element={<AddCalendarCoursePage />} />
      <Route path={`${SHOW_CALENDAR_COURSE}`} element={<ShowCalendarPage />} />

      <Route path="/*" element={<Navigate to={`${CALENDAR_COURSE + SHOW_CALENDAR_COURSE}`} />} />
    </Routes>
  )
}

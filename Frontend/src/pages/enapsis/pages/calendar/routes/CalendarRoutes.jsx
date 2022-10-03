import { Navigate, Route, Routes } from "react-router-dom"
import { CALENDAR, SHOW_CALENDAR } from "@models/privateRoutes"

import { CalendarPage } from "../pages"

export const CalendarRoutes = () => {
  return (
    <Routes>
      <Route path={`${SHOW_CALENDAR}`} element={<CalendarPage />} />

      <Route path="/*" element={<Navigate to={`${CALENDAR + SHOW_CALENDAR}`} />} />
    </Routes>
  )
}

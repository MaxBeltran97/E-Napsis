import { Navigate, Route, Routes } from "react-router-dom"
import { ADD_TELLER, SHOW_TELLERS, TELLERS } from "@models/privateRoutes"

import { AddTellerPage, ShowTellersPage } from "../pages"

export const TellerRoutes = () => {
  return (
    <Routes>
      <Route path={`${ADD_TELLER}`} element={<AddTellerPage />} />
      <Route path={`${SHOW_TELLERS}`} element={<ShowTellersPage />} />

      <Route path='/*' element={<Navigate to={`${TELLERS + SHOW_TELLERS}`} />} />
    </Routes>
  )
}

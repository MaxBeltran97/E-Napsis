import { Navigate, Route, Routes } from "react-router-dom"
import { ADD_PARTICIPANTS, IMPORT_PARTICIPANTS, PARTICIPANTS, SHOW_PARTICIPANTS } from "@models/privateRoutes"

import { AddParticipantPage, ImportParticipantsPage, ShowParticipantsPage } from "../pages"

export const ParticipantRoutes = () => {
  return (
    <Routes>
      <Route path={`${ADD_PARTICIPANTS}`} element={<AddParticipantPage />} />
      <Route path={`${SHOW_PARTICIPANTS}`} element={<ShowParticipantsPage />} />
      <Route path={`${IMPORT_PARTICIPANTS}`} element={<ImportParticipantsPage />} />

      <Route path='/*' element={<Navigate to={`${PARTICIPANTS + SHOW_PARTICIPANTS}`} />} />
    </Routes>
  )
}

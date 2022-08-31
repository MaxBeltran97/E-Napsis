import { Navigate, Route, Routes } from "react-router-dom"
import { AddParticipantPage, ImportParticipantsPage, ShowParticipantsPage } from "../pages"

export const ParticipantRoutes = () => {
    return (
        <Routes>
            <Route path="/agr-participantes" element={ <AddParticipantPage /> } />
            <Route path="/mst-participantes" element={ <ShowParticipantsPage /> } />
            <Route path="/imp-participantes" element={ <ImportParticipantsPage /> } />
            
            <Route path="/*" element={ <Navigate to={'/participantes/mst-participantes'} /> } />
        </Routes>
    )
}
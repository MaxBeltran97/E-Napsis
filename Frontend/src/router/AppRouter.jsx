import { Navigate, Route, Routes } from "react-router-dom"

import { AUTH, LOGIN } from "@models/publicRoutes"

import { EnapsisRoutes } from "@pages/enapsis/routes"
import { AuthRoutes } from "@pages/auth/routes"
import { useAuthStore } from "@hooks/useAuthStore"

export const AppRouter = () => {

  // const status = 'not-authenticated'
  // const status = 'not-authenticated'
  const { status } = useAuthStore()

  return (
    <Routes>
      {
        (status === 'authenticated')
          ? <Route path="/*" element={<EnapsisRoutes />} />
          : <Route path={`${AUTH}/*`} element={<AuthRoutes />} />
      }

      <Route path="/*" element={<Navigate to={`${AUTH + LOGIN}`} />} />
    </Routes>
  )
}

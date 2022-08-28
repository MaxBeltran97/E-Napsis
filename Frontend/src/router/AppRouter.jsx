import { Route, Routes } from 'react-router-dom'

import { AuthRoutes } from '../auth/routes'
import { EnapsisRoutes } from '../e-napsis/routes'

export const AppRouter = () => {
    return (
        <Routes>
            {/* Login */}
            <Route path='auth/*' element={<AuthRoutes />} />

            {/* E-napsis */}
            <Route path='/*' element={<EnapsisRoutes />} />
        </Routes>
    )
}

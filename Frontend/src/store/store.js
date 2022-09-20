import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './auth/authSlice'
import { rapporteurSlice } from './rapporteur/RapporteurSlice'
import { sidebarSlice } from './sidebar/SidebarSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        rapporteur: rapporteurSlice.reducer,
        sidebar: sidebarSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
import { configureStore } from "@reduxjs/toolkit";

import { authSlice, companySlice, participantSlice, tellerSlice, uiSlice } from "./slices";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    company: companySlice.reducer,
    teller: tellerSlice.reducer,
    participant: participantSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
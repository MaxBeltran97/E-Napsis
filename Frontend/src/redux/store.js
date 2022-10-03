import { configureStore } from "@reduxjs/toolkit";

import { authSlice, entitySlice, uiSlice } from "./slices";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    auth: authSlice.reducer,
    entity: entitySlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
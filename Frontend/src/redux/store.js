import { configureStore } from "@reduxjs/toolkit";
import { settingCompanySlice } from "@reduxSlices/settingCompanySlice";
import { settingSlice } from "@reduxSlices/settingSlice";

import { authSlice, calendarCourseSlice, companySlice, courseSlice, participantSlice, tellerSlice, uiSlice } from "./slices";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    setting: settingSlice.reducer,
    settingCompany: settingCompanySlice.reducer,
    auth: authSlice.reducer,
    company: companySlice.reducer,
    teller: tellerSlice.reducer,
    participant: participantSlice.reducer,
    course: courseSlice.reducer,
    calendarCourse: calendarCourseSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
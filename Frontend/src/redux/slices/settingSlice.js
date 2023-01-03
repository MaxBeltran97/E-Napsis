import { createSlice } from "@reduxjs/toolkit";

export const settingSlice = createSlice({
  name: 'settings',
  initialState: {
    isHolidaysLoading: false,
    activeHoliday: {},
    holidays: [],

    isEmailsLoading: false,
    activeEmail: {},
    emails: [],
  },
  reducers: {
    /** Holidays */
    onHandleHolidayLoading: (state, { payload }) => {
      state.isHolidaysLoading = payload
    },
    onHandleHolidays: (state, { payload }) => {
      state.holidays = payload
    },
    onHandleActiveHoliday: (state, { payload }) => {
      state.activeHoliday = payload
    },
    onResetActiveHoliday: (state) => {
      state.activeHoliday = {}
    },
    /** Fin Holidays */
    /** Emails */
    onHandleEmailsLoading: (state, { payload }) => {
      state.isEmailsLoading = payload
    },
    onHandleEmails: (state, { payload }) => {
      state.emails = payload
    },
    onHandleActiveEmail: (state, { payload }) => {
      state.activeEmail = payload
    },
    onResetActiveEmail: (state) => {
      state.activeEmail = {}
    }
    /** Fin Emails */
  }
})

export const {
  /** Holiday */
  onHandleHolidayLoading,
  onHandleHolidays,
  onHandleActiveHoliday,
  onResetActiveHoliday,
  /** Email */
  onHandleEmailsLoading,
  onHandleEmails,
  onHandleActiveEmail,
  onResetActiveEmail
} = settingSlice.actions

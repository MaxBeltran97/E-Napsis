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

    roles: [],
    privileges: [],
    privilegesRole: [],
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
    },
    /** Fin Emails */
    /** Privileges */
    onHandleRole: (state, { payload }) => {
      state.roles = payload
    },
    onHandlePrivileges: (state, { payload }) => {
      state.privileges = payload
    },
    onHandlePrivilegesRole: (state, { payload }) => {
      state.privilegesRole = payload
    },
    onResetPrivilegesRole: (state) => {
      state.privilegesRole = []
    }

    /** Fin Privileges */
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
  onResetActiveEmail,
  /** Privileges */
  onHandleRole,
  onHandlePrivileges,
  onHandlePrivilegesRole,
  onResetPrivilegesRole
} = settingSlice.actions

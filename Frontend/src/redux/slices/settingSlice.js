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

    isContractsLoading: false,
    activeContract: {},
    contracts: [
      {
        _id: 1,
        title: 'wena wena',
        header: 'nose que chucha',
        content: 'contenido xd',
        representativeHeader: '?'
      },
      {
        _id: 2,
        title: 'AAAAAAAA',
        header: 'texto de ejemplo',
        content: 'contenido de ejemplo',
        representativeHeader: '?'
      }
    ],

    isNoticesLoading: false,
    notices: [],

    roles: [],
    privileges: [],
    privilegesRole: [],

    companyData: {},
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
    /** Contracts */
    onHandleContractsLoading: (state, {payload}) => {
      state.isContractsLoading = payload
    },
    onHandleContracts: (state, {payload}) => {
      state.contracts = payload
    },
    onHandleActiveContract: (state, {payload}) => {
      state.activeContract = payload
    },
    onResetActiveContract: (state) => {
      state.activeContract = {}
    },
    /** Fin Contracts */
    /** Notices */
    onHandleNoticesLoading: (state, {payload}) => {
      state.isNoticesLoading = payload
    },
    onHandleNotices: (state, {payload}) => {
      state.notices = payload
    },
    /** Fin Notices */
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
    },
    /** Fin Privileges */
    /** Company Data */
    onHandleCompanyData: (state, {payload}) => {
      state.companyData = payload
    }
    /** Fin Company Data */
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
  /** Contract */
  onHandleContractsLoading,
  onHandleContracts,
  onHandleActiveContract,
  onResetActiveContract,
  /** Notices */
  onHandleNoticesLoading,
  onHandleNotices,
  /** Privileges */
  onHandleRole,
  onHandlePrivileges,
  onHandlePrivilegesRole,
  onResetPrivilegesRole,
  /** Company Data */
  onHandleCompanyData
} = settingSlice.actions

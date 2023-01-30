import { createSlice } from '@reduxjs/toolkit'

export const settingCompanySlice = createSlice ({
  name: 'settingsCompany',
  initialState: {
    companyData: {},

    isLogosLoading: false,
    activeLogo: {},
    logos: [],
  },
  reducers: {
    /** Company Data */
    onHandleCompanyData: (state, {payload}) => {
      state.companyData = payload
    },
    /** Fin Company Data */
    /** Logos */
    onHandleLogosLoading: (state, {payload}) => {
      state.isLogosLoading = payload
    },
    onHandleLogos: (state, {payload}) => {
      state.logos = payload
    },
    onHandleActiveLogo: (state, {payload}) => {
      state.activeLogo = payload
    },
    onResetActiveLogo: (state) => {
      state.activeLogo = {}
    },
    /** Fin Logos */
  }
})

export const {
  /** Company Data  */
  onHandleCompanyData,
  /** Logos */
  onHandleLogosLoading,
  onHandleLogos,
  onHandleActiveLogo,
  onResetActiveLogo,
} = settingCompanySlice.actions
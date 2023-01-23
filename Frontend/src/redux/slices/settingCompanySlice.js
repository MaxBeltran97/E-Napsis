import { createSlice } from '@reduxjs/toolkit'

export const settingCompanySlice = createSlice ({
  name: 'settingsCompany',
  initialState: {
    companyData: {},
  },
  reducers: {
    /** Company Data */
    onHandleCompanyData: (state, {payload}) => {
      state.companyData = payload
    }
    /** Fin Company Data */
  }
})

export const {
  /** Company Data  */
  onHandleCompanyData,
} = settingCompanySlice.actions
import enapsisApi from '@api/enapsisApi'
import { onHandleCompanyData } from '@reduxSlices/settingCompanySlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const useSettingCompanyStore = () => {
  
  // const navigate = useNavigate()
  const dispatch = useDispatch()

  const { companyData } = useSelector(state => state.settingCompany)

  /** Company Data  */
  const startGetCompanyData = async () => {
    try {
      const { data } = await enapsisApi.get('/company_data')
      if(data.ok) {
        dispatch(onHandleCompanyData(data.companyData[0]))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const startUpdateCompanyData = async (newCompanyData) => {
    try {
      const { data } = await enapsisApi.put(`/company_data/${newCompanyData._id}`, JSON.stringify(newCompanyData), { headers: { 'Content-Type': 'application/json' } })
      if (data.ok) {
        dispatch(onHandleCompanyData(data.companyData))
        return data.ok
      }
    } catch (error) {
      console.log(error)
    }
    return false
  }
  /** Fin Company Data  */
  
  return {
    //* Company Data
    companyData,

    //* Metodos Company Data
    startGetCompanyData,
    startUpdateCompanyData
  }
}

import enapsisApi from '@api/enapsisApi'
import { onHandleActiveLogo, onHandleCompanyData, onHandleLogos, onHandleLogosLoading, onResetActiveLogo } from '@reduxSlices/settingCompanySlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const useSettingCompanyStore = () => {

  // const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    companyData,
    isLogosLoading, activeLogo, logos
  } = useSelector(state => state.settingCompany)

  /** Company Data  */
  const startGetCompanyData = async () => {
    try {
      const { data } = await enapsisApi.get('/company_data')
      if (data.ok) {
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
  /** Logos */
  const startGetLogos = async () => {
    dispatch(onHandleLogosLoading(true))

    try {
      const { data } = await enapsisApi.get('/logos')
      if (data.ok) {
        dispatch(onHandleLogos(data.logos))
      }
    } catch (error) {
      console.log(error)
    }
    dispatch(onHandleLogosLoading(false))
  }

  const startGetLogo = async (logo_id) => {
    try {
      const { data } = await enapsisApi.get(`/logos/${logo_id}`)
      if (data.ok) {
        return data.logo
      }
    } catch (error) {
      console.log(error.response)
    }
    return null
  }

  const startChangeLogo = (logo) => {
    dispatch(onHandleActiveLogo(logo))

    setTimeout(() => {
      dispatch(onResetActiveLogo())
    }, 100)
  }

  const startSavingLogo = async (logo) => {
    dispatch(onHandleLogosLoading(true))

    const logoImg = logo.logo_img

    delete logo.logo_img

    if (!!logo._id) {
      try {
        const { data } = await enapsisApi.put(`/logos/${logo._id}`, JSON.stringify(logo), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          if (typeof logoImg !== "string") {
            let formData = new FormData()
            formData.append('logo_img', logoImg)

            await enapsisApi.put(`/logos/upload_file/${logo._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          }

          const { data } = await enapsisApi.get('/logos')
          if (data.ok) {
            dispatch(onHandleLogos(data.logos))
          }
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const { data } = await enapsisApi.post('/logos', JSON.stringify(logo), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          const logoBackend = data.logo

          if (typeof logoImg !== "string") {
            let formData = new FormData()
            formData.append('logo_img', logoImg)

            await enapsisApi.put(`/logos/upload_file/${logoBackend._id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
          }

          const { data: dataLogos } = await enapsisApi.get('/logos')
          if (dataLogos.ok) {
            dispatch(onHandleLogos(dataLogos.logos))
          }
        }
      } catch (error) {
        console.log(error)
      }
    }

    dispatch(onHandleLogosLoading(false))
  }

  const startDeleteLogo = async (logo_id) => {
    dispatch(onHandleLogosLoading(true))

    try {
      const { data } = await enapsisApi.delete(`/logos/${logo_id}`)
      if (data.ok) {
        const { data } = await enapsisApi.get('/logos')
        if (data.ok) {
          dispatch(onHandleLogos(data.logos))
        }
      }
    } catch (error) {
      console.log(error.response)
    }

    dispatch(onHandleLogosLoading(false))
  }
  /** Fin Logos */

  return {
    //* Company Data
    companyData,
    //* Logos
    isLogosLoading,
    activeLogo,
    logos,

    //* Metodos Company Data
    startGetCompanyData,
    startUpdateCompanyData,
    //* Metodos Logos
    startGetLogos,
    startGetLogo,
    startChangeLogo,
    startSavingLogo,
    startDeleteLogo
  }
}

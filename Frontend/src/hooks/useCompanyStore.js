import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import enapsisApi from "@api/enapsisApi"
import { onHandleActiveCompany, onHandleCompanies, onHandleLoading, onResetActiveCompany } from "@reduxSlices/companySlice"
import { parseNull } from "@helpers/parseNull"
import { ADD_COMPANY, COMPANIES } from "@models/privateRoutes"

export const useCompanyStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeCompany, companies } = useSelector(state => state.company)

  const startGetCompanies = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/company')
      if (data.ok) {
        dispatch(onHandleCompanies(data.companies))
      }
    } catch (error) {
      console.log(error.response)
    }
    setTimeout(() => {
      dispatch(onHandleLoading(false))
    }, 500)
  }

  const startGetCompany = async (company_id) => {
    try {
      const { data } = await enapsisApi.get(`/company/${company_id}`)
      if (data.ok) {
        return data.company
      }
    } catch (error) {
      console.log(error.response)
    }
    return null
  }

  const startChangeCompany = (company) => {
    company = {
      ...company,
      cellPhone: !!(company.cellPhone) ? company.cellPhone : '',
      rut: !!(company.rut) ? company.rut : ''
    }
    dispatch(onHandleActiveCompany(company))
    navigate(`${COMPANIES}${ADD_COMPANY}`, { replace: true })
  }

  const startResetActiveCompany = () => {
    dispatch(onResetActiveCompany())
  }

  const startSavingCompany = async (company) => {
    dispatch(onHandleLoading(true))

    company = { ...company, cellPhone: parseInt(company.cellPhone), rut: parseNull(company.rut) }

    if (!!company._id) { //Modificar una compañia existente
      try {
        const { data } = await enapsisApi.put(`/company/${company._id}`, JSON.stringify(company), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          navigate('../', { replace: true })
        } else {
          //TODO Manejar errores del modificar
        }
      } catch (error) {
        console.log(error.response)
      }
    } else { //Agregar una compañia nueva
      try {
        const { data } = await enapsisApi.post('/company', JSON.stringify(company), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          navigate('../', { replace: true })
        } else {
          //TODO Manejar errores del formulario obtenidos del backend
        }
      } catch (error) {
        console.log(error.response)
      }
    }
    dispatch(onHandleLoading(false))
  }

  // const getCompanyWithId = (company_id) => {
  //   return companies.find( company => company._id === company_id )
  // }

  const startDeleteCompany = async (company_id) => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.delete(`/company/${company_id}`)
      if (data.ok) {
        const { data } = await enapsisApi.get('/company')
        if (data.ok) {
          dispatch(onHandleCompanies(data.companies))
        }
      }
    } catch (error) {
      console.log(error)
    }

    setTimeout(() => {
      dispatch(onHandleLoading(false))
    }, 1000)
  }

  return {
    //* Propiedades
    isLoading,
    activeCompany,
    companies,

    //* Metodos
    startGetCompanies,
    startGetCompany,
    startChangeCompany,
    startResetActiveCompany,
    startSavingCompany,
    // getCompanyWithId
    startDeleteCompany
  }
}

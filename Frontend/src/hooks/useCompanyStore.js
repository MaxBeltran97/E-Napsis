import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import enapsisApi from "@api/enapsisApi"
import { onHandleCompanies, onHandleLoading } from "@reduxSlices/companySlice"
import { parseNull } from "@helpers/parseNull"

export const useCompanyStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeCompany, companies } = useSelector(state => state.company)

  const startGetCompanies = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/company')
      if(data.ok) {
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
      if(data.ok) {
        return data.company
      }
    } catch (error) {
      console.log(error.response)
    }
    return null
  }

  const startSavingCompany = async (company) => {
    dispatch(onHandleLoading(true))

    try {
      company = { ...company, cellPhone: parseInt(company.cellPhone), rut: parseNull(company.rut) }
      const { data } = await enapsisApi.post('/company', JSON.stringify(company), { headers: { 'Content-Type': 'application/json' } })
      if(data.ok) {
        navigate('../', {replace: true})
      }else {
        //TODO Manejar errores del formulario obtenidos del backend
      }
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  const getCompanyWithId = (company_id) => {
    return companies.find( company => company._id === company_id )
  }

  return {
    //* Propiedades
    isLoading,
    activeCompany,
    companies,

    //* Metodos
    startGetCompanies,
    startGetCompany,
    startSavingCompany,
    getCompanyWithId
  }
}

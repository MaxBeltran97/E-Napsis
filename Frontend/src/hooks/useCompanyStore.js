import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import enapsisApi from "@api/enapsisApi"
import { onHandleCompanies, onHandleLoading } from "@reduxSlices/companySlice"

export const useCompanyStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeCompany, companies } = useSelector(state => state.company)

  const startGetCompanies = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/company')
      dispatch(onHandleCompanies(data))
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  const startSavingCompany = async (company) => {
    dispatch(onHandleLoading(true))

    try {
      company = { ...company, cellPhone: parseInt(company.cellPhone) }
      const { data } = await enapsisApi.post('/company', JSON.stringify(company))
      console.log(data)
      navigate('../', {replace: true})
    } catch (error) {
      //TODO Manejar los errores que tira el backend
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
    startSavingCompany,
    getCompanyWithId
  }
}

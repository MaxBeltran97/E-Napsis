import { useDispatch, useSelector } from "react-redux"
import { onHandleCompanies, onHandleLoading } from "@reduxSlices/companySlice"
import enapsisApi from "@api/enapsisApi"

export const useCompanyStore = () => {

  const dispatch = useDispatch()
  const { isLoading, activeCompany, companies } = useSelector(state => state.company)

  const startGetCompanies = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/company')
      dispatch(onHandleCompanies(data))
      console.log(data)
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  const startSavingCompany = async (company) => {
    dispatch(onHandleLoading(true))

    try {
      company = { ...company, cellPhone: parseInt(company.cellPhone, 10) }
      const { data } = await enapsisApi.post('/company', JSON.stringify(company))
      console.log(data)
    } catch (error) {
      //TODO Manejar los errores que tira el backend
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  return {
    //* Propiedades
    isLoading,
    activeCompany,
    companies,

    //* Metodos
    startGetCompanies,
    startSavingCompany
  }
}

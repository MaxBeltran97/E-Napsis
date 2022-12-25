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

    dispatch(onHandleLoading(false))
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

    dispatch(onHandleLoading(false))
  }

  const sortedCompaniesByName = (acending = true) => {
    const sorted = [...companies].sort((a, b) => {
      const nameA = `${a.fantasyName}`.toUpperCase()
      const nameB = `${b.fantasyName}`.toUpperCase()

      if (nameA > nameB) {
        return acending ? 1 : -1
      }
      if (nameA < nameB) {
        return acending ? -1 : 1
      }
      return 0
    })

    dispatch(onHandleCompanies(sorted))
  }

  const sortedCompaniesByRUT = (acending = true) => {
    const sorted = [...companies].sort((a, b) => {
      if (a.rut === null && b.rut === null) {
        const nameA = `${a.fantasyName}`.toUpperCase()
        const nameB = `${b.fantasyName}`.toUpperCase()

        if (nameA > nameB) {
          return acending ? 1 : -1
        }
        if (nameA < nameB) {
          return acending ? -1 : 1
        }
        return 0
      }

      if (a.rut === null && b.rut !== null) {
        return acending ? 1 : -1
      }
      if (a.rut !== null && b.rut === null) {
        return acending ? -1 : 1
      }

      const rutA = `${a.rut}`.toUpperCase()
      const rutB = `${b.rut}`.toUpperCase()

      if (rutA > rutB) {
        return acending ? 1 : -1
      }
      if (rutA < rutB) {
        return acending ? -1 : 1
      }
    })

    dispatch(onHandleCompanies(sorted))
  }

  const filterCompanies = async (filters) => {
    dispatch(onHandleLoading(true))

    //obtener companies
    const { data } = await enapsisApi.get('/company')
    const companiesAwait = data.companies

    const name = filters.name.toUpperCase().trim()
    const rut = filters.rut.toUpperCase().trim()

    const filtered = companiesAwait.filter((x) => {
      const nameCompany = `${x.fantasyName}`.toUpperCase()
      const rutCompany = (x.rut === null) ? '' : x.rut.toUpperCase()

      if( name === '' && rut === '' && filters.region === '' ) {
        return true
      }
      if ( name !== '' && rut !== '' && filters.region !== '') {
        return (nameCompany.includes(name) && rutCompany.includes(rut) && x.region === filters.region)
      }

      if( name !== '' && rut === '' && filters.region === '' ) {
        return nameCompany.includes(name)
      }
      if( name !== '' && rut !== '' && filters.region === '' ) {
        return (nameCompany.includes(name) && rutCompany.includes(rut))
      }
      if( name !== '' && rut === '' && filters.region !== '' ) {
        return (nameCompany.includes(name) && x.region === filters.region)
      }

      if( name === '' && rut !== '' && filters.region === '' ) {
        return rutCompany.includes(rut)
      }
      if( name === '' && rut !== '' && filters.region !== '' ) {
        return (rutCompany.includes(rut) && x.region === filters.region)
      }

      if( name === '' && rut === '' && filters.region !== '' ) {
        return x.region === filters.region
      }
    })

    dispatch(onHandleCompanies(filtered))
    dispatch(onHandleLoading(false))
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
    startDeleteCompany,

    //* Metodos para ordenar
    sortedCompaniesByName,
    sortedCompaniesByRUT,

    //* Filtro
    filterCompanies
  }
}

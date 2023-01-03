import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import enapsisApi from "@api/enapsisApi"
import { onHandleActiveParticipant, onHandleLoading, onHandleParticipants, onResetActiveParticipant } from "@reduxSlices/participantSlice"
import { parseNull } from "@helpers/parseNull"
import { ADD_PARTICIPANTS, PARTICIPANTS } from "@models/privateRoutes"
import { useCompanyStore } from "./useCompanyStore"

export const useParticipantStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { startGetCompany } = useCompanyStore()
  const { isLoading, activeParticipant, participants } = useSelector(state => state.participant)

  const startGetParticipants = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/participant')
      if (data.ok) {
        dispatch(onHandleParticipants(data.participants))
      }
    } catch (error) {
      console.log(error.response)
    }

    dispatch(onHandleLoading(false))
  }

  const startGetParticipant = async (participant_id) => {
    try {
      const { data } = await enapsisApi.get(`/participant/${participant_id}`)
      if (data.ok) {
        return data.participant
      }
    } catch (error) {
      console.log(error.response)
    }
    return null
  }

  const startChangeParticipant = (participant) => {
    participant = {
      ...participant,
      company_id: !!(participant.company_id) ? participant.company_id : '',
    }
    dispatch(onHandleActiveParticipant(participant))
    navigate(`${PARTICIPANTS}${ADD_PARTICIPANTS}`, { replace: true })
  }

  const startResetActiveParticipant = () => {
    dispatch(onResetActiveParticipant())
  }

  const startSavingParticipant = async (participant) => {
    dispatch(onHandleLoading(true))

    participant = { ...participant, company_id: parseNull(participant.company_id) }

    if (!!participant._id) {
      try {
        const { data } = await enapsisApi.put(`/participant/${participant._id}`, JSON.stringify(participant), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          navigate('../', { replace: true })
        } else {
          //TODO Manejar errores del modificar
        }
      } catch (error) {
        console.log(error.message)
      }
    } else {
      const { data } = await enapsisApi.post('/participant', JSON.stringify(participant), { headers: { 'Content-Type': 'application/json' } })
      if (data.ok) {
        navigate('../', { replace: true })
      } else {
        //TODO Manejar errores del formulario obtenidos del backend
      }
    }
    dispatch(onHandleLoading(false))
  }

  const startSavingParticipantFile = async (form) => {
    dispatch(onHandleLoading(true))

    try {
      let formData = new FormData()
      formData.append('calendarCourse_id', form.calendarCourse_id)
      formData.append('company_id', form.company_id)
      formData.append('excel', form.excelParticipants[0].file)

      const { data } = await enapsisApi.post('/participant/uploadfile', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      if (data.ok) {
        console.log('wena wena')
        navigate('../', { replace: true })
      } else {
        //TODO Manejar errores del formulario obteniods del backend
      }
    } catch (error) {
      console.log(error.response)
    }

  }

  const startDeleteParticipant = async (participant_id) => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.delete(`/participant/${participant_id}`)
      if (data.ok) {
        const { data } = await enapsisApi.get('/participant')
        if (data.ok) {
          dispatch(onHandleParticipants(data.participants))
        }
      }
    } catch (error) {
      console.log(error)
    }

    dispatch(onHandleLoading(false))    
  }

  const sortedParticipantsByName = (acending = true) => {
    const sorted = [...participants].sort((a, b) => {
      const nameA = `${a.fullName} ${a.lastName} ${a.motherLastName}`.toUpperCase()
      const nameB = `${b.fullName} ${b.lastName} ${b.motherLastName}`.toUpperCase()

      if (nameA > nameB) {
        return acending ? 1 : -1
      }
      if (nameA < nameB) {
        return acending ? -1 : 1
      }
      return 0
    })

    dispatch(onHandleParticipants(sorted))
  }

  const sortedParticipantsByRUT = (acending = true) => {
    const sorted = [...participants].sort((a, b) => {
      const rutA = `${a.rut}`.toUpperCase()
      const rutB = `${b.rut}`.toUpperCase()

      if (rutA > rutB) {
        return acending ? 1 : -1
      }
      if (rutA < rutB) {
        return acending ? -1 : 1
      }
      return 0
    })

    dispatch(onHandleParticipants(sorted))
  }

  const sortedParticipantsByCompany = async (acending = true) => {

    const comparableArray = await Promise.all(participants.map(async x => [(x.company_id !== null) ? await startGetCompany(x.company_id) : null, x]))
    comparableArray.sort((a, b) => {
      // En caso de que las compañias sean las mismas o sean nulas ordena por nombre
      if ((a[0]?._id === b[0]?._id) || (a[0] === null && b[0] === null)) {
        const nameA = `${a[1].fullName} ${a[1].lastName} ${a[1].motherLastName}`.toUpperCase()
        const nameB = `${b[1].fullName} ${b[1].lastName} ${b[1].motherLastName}`.toUpperCase()

        if (nameA > nameB) {
          return 1
        }
        if (nameA < nameB) {
          return -1
        }
        return 0
      }

      if (a[0] === null && b[0] !== null) {
        return acending ? 1 : -1
      }
      if (a[0] !== null && b[0] === null) {
        return acending ? -1 : 1
      }

      if (a[0].fantasyName.toUpperCase() > b[0].fantasyName.toUpperCase()) {
        return acending ? 1 : -1
      }
      if (a[0].fantasyName.toUpperCase() < b[0].fantasyName.toUpperCase()) {
        return acending ? -1 : 1
      }
    })
    const sorted = comparableArray.map(x => x[1])

    dispatch(onHandleParticipants(sorted))
  }

  const filterParticipants = async (filters) => {
    dispatch(onHandleLoading(true))

    const { data } = await enapsisApi.get('/participant')
    const participantAwait = data.participants

    const fullName = filters.name.toUpperCase().trim()
    const rut = filters.rut.toUpperCase().trim()

    const filtered = participantAwait.filter((x) => {
      const nameParticipant = `${x.fullName} ${x.lastName} ${x.motherLastName}`.toUpperCase()
      const rutParticipant = x.rut.toUpperCase()
      const isCompany = filters.companies_id?.filter((c) => {
        if(c.value === -1 && x.company_id === null) {
          return true
        }
        return c.value === x.company_id
      })

      if( fullName === '' && rut === '' && (filters.companies_id === undefined || filters.companies_id.length === 0) ) {
        return true
      }
      if( fullName !== '' && rut !== '' && (filters.companies_id.length >= 1) ) {
        console.log(filters.companies_id.length)
        return( (nameParticipant.includes(fullName)) && (rutParticipant.includes(rut)) && (isCompany.length === 1))
      }

      if( fullName !== '' && rut === '' && (filters.companies_id === undefined || filters.companies_id.length === 0) ) {
        return nameParticipant.includes(fullName)
      }
      if( fullName !== '' && rut !== '' && (filters.companies_id === undefined || filters.companies_id.length === 0) ) {
        return (nameParticipant.includes(fullName) && rutParticipant.includes(rut))
      }
      if( fullName !== '' && rut === '' && (filters.companies_id.length >= 1) ) {
        return (nameParticipant.includes(fullName) && (isCompany.length === 1))
      }

      if( fullName === '' && rut !== '' && (filters.companies_id === undefined || filters.companies_id.length === 0) ) {
        return rutParticipant.includes(rut)
      }
      if( fullName === '' && rut !== '' && (filters.companies_id.length >= 1) ) {
        return (rutParticipant.includes(rut) && (isCompany.length === 1))
      }

      if( fullName === '' && rut === '' && (filters.companies_id.length >= 1) ) {
        return (isCompany.length === 1)
      }
    })

    dispatch(onHandleParticipants(filtered))
    dispatch(onHandleLoading(false))
  }

  return {
    //* Propiedades
    isLoading,
    activeParticipant,
    participants,

    //* Metodos
    startGetParticipants,
    startGetParticipant,
    startChangeParticipant,
    startResetActiveParticipant,
    startSavingParticipant,
    startSavingParticipantFile,
    startDeleteParticipant,

    //* Metodos para ordenar
    sortedParticipantsByName,
    sortedParticipantsByRUT,
    sortedParticipantsByCompany,

    //* Filtrar
    filterParticipants
  }
}

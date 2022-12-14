import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import enapsisApi from "@api/enapsisApi"
import { onHandleActiveTeller, onHandleLoading, onHandleTellers, onResetActiveTeller } from "@reduxSlices/tellerSlice"
import { parseBool } from "@helpers"
import { ADD_TELLER, TELLERS } from "@models/privateRoutes"

export const useTellerStore = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, activeTeller, tellers } = useSelector(state => state.teller)

  const startGetTellers = async () => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.get('/teller')
      if (data.ok) {
        dispatch(onHandleTellers(data.tellers))
      }
    } catch (error) {
      console.log(error.response)
    }

    dispatch(onHandleLoading(false))
  }

  const startGetTeller = async (teller_id) => {
    try {
      const { data } = await enapsisApi.get(`/teller/${teller_id}`)
      if (data.ok) {
        return data.teller
      }
    } catch (error) {
      console.log(error.response)
    }
    return null
  }

  const startGetTellerUsername = async (user_id) => {
    try {
      const { data } = await enapsisApi.get(`/user/${user_id}`)
      if (data.ok) {
        return data.user
      }
    } catch (error) {
      console.log(error.response)
    }
    return null
  }

  const startChangeTeller = (teller) => {
    teller = {
      ...teller,
      birthday: !!(teller.birthday) ? new Date(teller.birthday) : '',
    }
    dispatch(onHandleActiveTeller(teller))
    navigate(`${TELLERS}${ADD_TELLER}`, { replace: true })
  }

  const startResetActiveTeller = () => {
    dispatch(onResetActiveTeller())
  }

  const startSavingTeller = async (teller) => {
    dispatch(onHandleLoading(true))

    const tellerFiles = teller.tellerFiles
    teller = {
      ...teller,
      birthday: (teller.birthday === '') ? null : new Date(teller.birthday).toISOString().slice(0, 19).replace('T', ' '),
      cellPhone: parseInt(teller.cellPhone),
      situation: parseBool(teller.situation),
      uploadFiles: parseBool(teller.uploadFiles),
      reuf: parseBool(teller.reuf)
    }
    delete teller.tellerFiles

    if (!!teller._id) {
      try {
        const { data } = await enapsisApi.put(`/teller/${teller._id}`, JSON.stringify(teller), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          navigate('../', { replace: true })
        } else {
          //TODO Manejar errores del modificar
        }
      } catch (error) {
        console.log(error.response)
      }
    } else {
      try {
        const { data } = await enapsisApi.post('/teller', JSON.stringify(teller), { headers: { 'Content-Type': 'application/json' } })
        if (data.ok) {
          //TODO Guardar los tellerFiles
          tellerFiles.map(async (file) => {
            let formData = new FormData()
            formData.append('teller_id', data.teller._id)
            formData.append('name', '')
            formData.append('uploadFile', file.file)

            const { data: dataFile } = await enapsisApi.post('/teller/uploadfile', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            if (dataFile.ok) {
              //TODO Manejar la subida
            } else {
              //TODO Manejar errores del formulario obteniods del backend
            }
          })
          navigate('../', { replace: true })
        } else {
          //TODO Manejar errores del formulario obtenidos del backend
        }
      } catch (error) {
        console.log(error)
      }
    }
    dispatch(onHandleLoading(false))
  }

  const startDeleteTeller = async (teller_id) => {
    dispatch(onHandleLoading(true))

    try {
      const { data } = await enapsisApi.delete(`/teller/${teller_id}`)
      if (data.ok) {
        const { data } = await enapsisApi.get('/teller')
        if (data.ok) {
          dispatch(onHandleTellers(data.tellers))
        }
      }
    } catch (error) {
      console.log(error.response)
    }

    dispatch(onHandleLoading(false))
  }

  const sortedTellersByName = (acending = true) => {
    const sorted = [...tellers].sort((a, b) => {
      const nameA = `${a.fullName} ${a.lastName} ${a.motherLastName}`.toUpperCase()
      const nameB = `${b.fullName} ${b.lastName} ${b.motherLastName}`.toUpperCase()

      if(nameA > nameB) {
        return acending ? 1 : -1
      }
      if(nameA < nameB) {
        return acending ? -1 : 1
      }
      return 0
    })

    dispatch(onHandleTellers(sorted))
  }

  const sortedTellersByStatus = (acending = true) => {
    const sorted = [...tellers].sort((a, b) => {

      if (a.situation === true && b.situation === false) {
        return acending ? -1 : 1
      }
      if (a.situation === false && b.situation === true) {
        return acending ? 1 : -1
      }

      // En caso de ser iguales ordena por nombre
      const nameA = `${a.fullName} ${a.lastName} ${a.motherLastName}`.toUpperCase()
      const nameB = `${b.fullName} ${b.lastName} ${b.motherLastName}`.toUpperCase()

      if(nameA > nameB) {
        return 1
      }
      if(nameA < nameB) {
        return -1
      }
      return 0
    })

    dispatch(onHandleTellers(sorted))
  }

  const filterTellers = async (filters) => {
    dispatch(onHandleLoading(true))
    
    const { data } = await enapsisApi.get('/teller')
    const tellersAwait = data.tellers

    const nameUser = filters.name_user.toUpperCase().trim()
    const rut = filters.rut.toUpperCase().trim()

    const filteredArray = await Promise.all(tellersAwait.map(async x => [(await startGetTellerUsername(x.user_id)).username, x])) 
    let filtered = filteredArray.filter((x) => {
      const nameTeller = `${x[1].fullName} ${x[1].lastName} ${x[1].motherLastName}`.toUpperCase()
      const userTeller = x[0].toUpperCase()
      const rutTeller = x[1].rut.toUpperCase()

      if( nameUser === '' && rut === '' && filters.situation === 'no-aplica' ) {
        return true
      }
      if( nameUser !== '' && rut !== '' && filters.situation !== 'no-aplica' ) {
        return ((nameTeller.includes(filters.name_user.toUpperCase()) || userTeller.includes(filters.name_user.toUpperCase())) && (rutTeller.includes(rut)) && ((filters.situation === 'true') ? (x[1].situation === true) : (x[1].situation === false)))
      }

      if( nameUser !== '' && rut === '' && filters.situation === 'no-aplica' ) {
        return (nameTeller.includes(filters.name_user.toUpperCase()) || userTeller.includes(filters.name_user.toUpperCase()))
      }
      if( nameUser !== '' && rut !== '' && filters.situation === 'no-aplica' ) {
        return ((nameTeller.includes(filters.name_user.toUpperCase()) || userTeller.includes(filters.name_user.toUpperCase())) && rutTeller.includes(rut))
      }
      if( nameUser !== '' && rut === '' && filters.situation !== 'no-aplica' ) {
        return ((nameTeller.includes(filters.name_user.toUpperCase()) || userTeller.includes(filters.name_user.toUpperCase())) && ((filters.situation === 'true') ? (x[1].situation === true) : (x[1].situation === false)))
      }

      if( nameUser === '' && rut !== '' && filters.situation === 'no-aplica' ) {
        return rutTeller.includes(rut)
      }
      if( nameUser === '' && rut !== '' && filters.situation !== 'no-aplica' ) {
        return (rutTeller.includes(rut) && ((filters.situation === 'true') ? (x[1].situation === true) : (x[1].situation === false)))
      }

      if( nameUser === '' && rut === '' && filters.situation !== 'no-aplica' ) {
        return (filters.situation === 'true') ? (x[1].situation === true) : (x[1].situation === false)
      }
    })

    filtered = filtered.map(x => x[1])

    dispatch(onHandleTellers(filtered))
    dispatch(onHandleLoading(false))
  }

  const startNewKeyTeller = async (teller_id) => {
    try {
      const {data} = await enapsisApi.post(`/teller/password/${teller_id}`)
      return data.ok
    } catch (error) {
      console.log(error.response)
    }
    return false
  }

  return {
    //* Propiedades
    isLoading,
    activeTeller,
    tellers,

    //* Metodos
    startGetTellers,
    startGetTeller,
    startGetTellerUsername,
    startChangeTeller,
    startResetActiveTeller,
    startSavingTeller,
    startDeleteTeller,
    startNewKeyTeller,

    //* Metodos para ordenar
    sortedTellersByName,
    sortedTellersByStatus,

    //* Filtro
    filterTellers
  }
}

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
    setTimeout(() => {
      dispatch(onHandleLoading(false))
    }, 500)
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

    setTimeout(() => {
      dispatch(onHandleLoading(false))
    }, 1000)
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

    //* Metodos para ordenar
    sortedTellersByName,
    sortedTellersByStatus,
  }
}

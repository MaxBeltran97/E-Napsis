import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import enapsisApi from "@api/enapsisApi"
import { onHandleLoading, onHandleTellers } from "@reduxSlices/tellerSlice"
import { parseBool } from "@helpers"

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

  const startSavingTeller = async (teller) => {
    dispatch(onHandleLoading(true))

    try {
      const tellerFiles = teller.tellerFiles
      teller = {
        ...teller,
        birthday: new Date(teller.birthday).toISOString().slice(0, 19).replace('T', ' '),
        cellPhone: parseInt(teller.cellPhone),
        situation: parseBool(teller.situation),
        uploadFiles: parseBool(teller.uploadFiles),
        reuf: parseBool(teller.reuf)
      }
      delete teller.tellerFiles
      const { data } = await enapsisApi.post('/teller', JSON.stringify(teller), { headers: { 'Content-Type': 'application/json' } })
      if (data.ok) {
        //TODO Guardar los tellerFiles
        navigate('../', { replace: true })
      } else {
        //TODO Manejar errores del formulario obtenidos del backend
      }
    } catch (error) {
      console.log(error.response)
    }
    dispatch(onHandleLoading(false))
  }

  return {
    //* Propiedades
    isLoading,
    activeTeller,
    tellers,

    //* Metodos
    startGetTellers,
    startGetTeller,
    startSavingTeller
  }
}
